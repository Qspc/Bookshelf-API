module.exports = {
  commonError: {
    error: true,
    msg: 'terjadi kesalahan pada server',
  },

  commonErrorMsg: (msg) => {
    return {
      error: true,
      msg: msg,
    };
  },

  commonSuccess: {
    error: false,
    msg: 'berhasil masuk server',
  },

  commonSuccessMsg: (msg) => {
    return {
      error: false,
      msg: msg,
    };
  },

  commonResult: (data) => {
    return {
      error: false,
      msg: 'berhasil memuat data',
      data: data,
    };
  },
};
