const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const { Schema } = mongoose;

const userSchema = new Schema({
  // 이메일
  email: {
    type: String,
  },
  // 닉네임
  nickname: {
    type: String,
  },
  // 성별
  gender: {
    type: String,
  },
  // 나이
  age: {
    type: String,
  },
  // 회원가입일
  create_date: {
    type: Date,
    default: Date.now(),
  },
  // 탈퇴일
  out_date: {
    type: Date,
    default: Date.now(),
  },
  // 프로필 사진 파일 id
  profile_file_id: {
    type: String,
    default: "default_profile",
  },
  // oauth data 제공자 ( kakao, google )
  provider: {
    type: String,
  },
});

// jwt token생성 함수
userSchema.statics.generateToken = function () {
  const JWT_SECRET = process.env.JWT_SECRET;
  const token = jwt.sign(
    // token안에 넣을 data
    {
      _id: this._id,
      email: this.email,
      nickname: this.nickname,
    },
    JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );

  return token;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
