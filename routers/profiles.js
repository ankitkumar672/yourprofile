const express = require('express')
const router = express.Router()
const Profile = require('../models/profile')

router.get('/', async (req, res) => {
    let searchOption = {}
    if(req.query.name != null && req.query.name !== ''){
        searchOption.name = new RegExp(req.query.name, 'i')
    }
    try {
        const profiles = await Profile.find(searchOption)
        res.render('profiles/index', {
            profiles: profiles,
            searchOption: req.query
        })
    } catch {
        res.redirect('/')
    }
})

router.get('/new', (req, res) => {
    res.render('profiles/new', {profile: new Profile()})
})

router.post('/new', async (req, res) => {
    const profile = new Profile({
        name: req.body.name
    })
    try {
        const newProfile = await profile.save()
        res.redirect('profiles')
    } catch {
        res.render('profiles/new', {
            profile: profile,
            errorMessage: 'Error Creating Profile'
        })
    }
})

router.get('/:id', async (req, res) => {
    try {
        const profile = await Profile.findById(req.params.id)
        res.render('profiles/show', {
            profile: profile
        })
    } catch {
        res.redirect('/')
    }
})

router.get('/:id/edit', async (req, res) => {
    try {
        const profile = await Profile.findById(req.params.id)
        res.render('profiles/edit', { profile: profile })
    } catch {
        res.redirect('/profiles')
    }
})

router.put('/:id', async (req, res) => {
    let profile
    try {
        profile = await Profile.findById(req.params.id)
        profile.name = req.body.name
        await profile.save()
        res.redirect(`/profiles/${profile.id}`)
    } catch {
        if (profile==null) {
            res.redirect('/')
        } else {
            res.render('profile/edit', {
                profile: profile,
                errorMessage: ' Error in Changing Profile'
            })
        }
    }
})

router.delete('/:id', async (req, res) => {
    let profile
    try{
        profile = await Profile.findById(req.params.id)
        await profile.remove()
        res.redirect('/profiles')
    } catch {
        if (profile==null){
            res.redirect('/')
        } else {
            res.redirect(`/profile/${profile.id}`)
        }
    }
})

module.exports = router