const { check } = require('express-validator');

module.exports = {
  register: [
    check('name', '名前を入力してください').notEmpty(),
    check('mail', 'メールアドレスを入力してください').notEmpty(),
    check('mail', 'メールアドレスが正しく入力されていません。').custom(el =>
      !el ? true : el.includes('@')
    ),
    check('password', 'パスワードを入力してください。').notEmpty(),
    check('password', 'パスワードは6文字以上12文字以内で入力してください。').custom(el => 
      !el ? true : el.length >= 6 && el.length <= 12
    ),
    check('age', '年齢を半角かつ数値で入力してください。').notEmpty(),
    check('occupation', '職業を入力してください。').notEmpty(),
  ],
  resetPassword: [
    check('mail', 'メールアドレスを入力してください').notEmpty(),
    check('mail', 'メールアドレスが正しく入力されていません。').custom(el =>
      !el ? true : el.includes('@')
    ),
    check('password', 'パスワードを入力してください。').notEmpty(),
    check('password', 'パスワードは6文字以上12文字以内で入力してください。').custom(el => 
      !el ? true : el.length >= 6 && el.length <= 12
    ),
  ],
  registerKillerData: [
    check('killPersonName', '殺したい人の名前を入力してください').notEmpty(),
  ]
};

