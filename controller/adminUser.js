const { Router } = require('express')

const router = Router()
const adminUserModel = require('../model/adminUser')
const auth = require('./auth')

router.post('/', auth, async (req, res, next) => {//添加管理员
    try {
        let {
            username,
            nickname,
            avatar,
            password,
            desc,
            job,
            phone,
            sex
        } = req.body
        const userinfo = await adminUserModel.findOne({ username })
        if (userinfo) {
            res.json({
                code: 400,
                msg: '该用户已存在'
            })
        } else {
            const data = await adminUserModel.create({
                username,
                nickname,
                avatar,
                password,
                desc,
                job,
                phone,
                sex
            })
            res.json({
                code: 200,
                data,
                msg: '新建用户成功'
            })
        }

    } catch (err) {
        next(err)
    }
})
router.post('/login', async (req, res, next) => {//登录
    try {
        const { username, password } = req.body;
        if (username && password) {
            const user = await adminUserModel.findOne({ username })
            const data = await adminUserModel.findOne({ username }, { password: 0 })
            if (user) {
                if (password == user.password) {
                    req.session.user = user //将用户的信息存进session
                    res.json({
                        code: 200,
                        msg: '登陆成功',
                        data
                    })
                } else {
                    res.json({
                        code: 401,
                        msg: '密码错误'
                    })
                }
            } else {
                res.json({
                    code: 401,
                    msg: '用户不存在'
                })
            }
        } else {
            res.json({
                code: 400,
                msg: '缺少参数'
            })
        }
    } catch (err) {
        next(err)
    }
})

router.post('/update', auth, (req, res, next) => {
    try {
        if (req.session.user) {
            req.session.user = null
            res.json({
                code: 200,
                msg: '退出成功'
            })
        } else {
            res.json({
                code: 403,
                msg: '用户未登录'
            })
        }
    } catch (err) {
        next(err)
    }
})
router.get('/', auth, async (req, res, next) => {
    try {
        let { page = 1, pageSize = 10 } = req.query;
        page = parseInt(page)
        pageSize = parseInt(pageSize)
        const total = await adminUserModel.count()
        let user = await adminUserModel.find().skip((page - 1) * pageSize).limit(pageSize).sort({ _id: -1 }).select("-password")
            .then(data => {
                res.json({
                    data,
                    code: 200,
                    msg: 'success',
                    total
                })
            })
    } catch (err) {
        next(err)
    }

})
router.get('/:id', auth, async (req, res, next) => {
    try {
        let { id } = req.params
        await adminUserModel.findOne({ _id: id }).then(data => {
            res.json({
                data,
                code: 200,
                msg: 'success'
            })
        })
    } catch (err) {
        next(err)
    }

})
router.delete('/:id', auth, async (req, res, next) => {
    try {
        let { id } = req.params
        await adminUserModel.deleteOne({ _id: id })
        res.json({
            code: 200,
            msg: '删除成功'
        })

    } catch (err) {
        next(err)
    }

})

router.patch("/:id", auth, async (req, res, next) => {
    try {
        let {id} = req.params
        const {
            nickname,
            avatar,
            desc,
            job,
            phone,
            sex
        } = req.body
        const data = await adminUserModel.findById(id) 
        const updateData = await data.update({
            $set:{
            nickname,
            avatar,
            desc,
            job,
            phone,
            sex
            }
        })
        res.json({
            code: 200,
            msg: '修改成功',
            data: updateData
        })
    } catch (err) {
        next(err)
    }
})
router.patch("/userinfo/:id", auth, async (req, res, next) => {
    try {
        let {id} = req.params
        const {
            nickname,
            username,
            avatar,
            desc,
            job,
            phone,
            sex
        } = req.body
        const data = await adminUserModel.findById(id) 
        const updateData = await data.update({
            $set:{
            nickname,
            username,
            avatar,
            desc,
            job,
            phone,
            sex
            }
        })
        res.json({
            code: 200,
            msg: '修改成功',
            data: updateData
        })
    } catch (err) {
        next(err)
    }
})
router.patch("/password/:id", auth, async (req, res, next) => {
    try {
        let {id} = req.params
        const {
            password
        } = req.body
        const data = await adminUserModel.findById(id) 
        const updateData = await data.update({
            $set:{
                password
            }
        })
        res.json({
            code: 200,
            msg: '修改密码成功',
            data: updateData
        })
    } catch (err) {
        next(err)
    }
})

module.exports = router