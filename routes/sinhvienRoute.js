const express = require('express');
const router = express.Router();
const SinhVien = require('../models/sinhvienModel');

// GET: Lấy tất cả sinh viên
router.get('/', async (req, res) => {
    try {
        const sinhviens = await SinhVien.find();
        res.render('sinhviens', { sinhviens: sinhviens });
        console.log(sinhviens);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Không kết nối được với server' });
    }
});

// POST: Tạo mới một sinh viên
router.post('/', async (req, res) => {
    try {
        const { id, name } = req.body; // Lấy dữ liệu từ body
        const newSinhVien = new SinhVien({ id, name });
        await newSinhVien.save();
        res.status(201).json(newSinhVien);
        console.log(newSinhVien);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Không thể tạo sinh viên mới' });
    }
});

// PUT: Cập nhật thông tin sinh viên
router.put('/:_id', async (req, res) => {
    try {
        const { _id } = req.params;
        const { id, name } = req.body;
        const updatedSinhVien = await SinhVien.findByIdAndUpdate(_id, { id, name }, { new: true });
        if (!updatedSinhVien) {
            return res.status(404).json({ error: 'Sinh viên không tồn tại' });
        }
        res.json(updatedSinhVien);
        console.log(updatedSinhVien);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Không thể cập nhật sinh viên' });
    }
});

module.exports = router;
