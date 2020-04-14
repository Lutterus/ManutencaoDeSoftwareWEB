import Api from '@/service/Api'

export default {
  getMiles() {
    return Api().get('/api/getProgramsDefault')
  },
  signIn(username, password) {
    return Api().post('/api/login', { username, password })
  },
  getMile(codUser, codMilha) {
    return Api().get(`/api/getMile/${codUser}/${codMilha}`)
  },
  deleteMile(codMilha, contaLogin, program) {
    return Api().post('/api/deleteMile', { 
      cod_milha: codMilha,
      user: contaLogin,
      program: program
    })
  },
  editMile(mile) {
    return Api().post('/api/editMile', mile)
  },
  getDashInfo(page = 1, search = 'all') {
    return Api().get(`/api/getAllUsersMiles/${page}/${search}`)
  },
  resetPassword(email) {
    return Api().post('/api/resetPassword', {email})
  },
  getNewPasswordToken(token) {
    return Api().get(`/api/getResetPassword/${token}`)
  },
  setNewPassword(email, newPassword, idToken){
    return Api().post('/api/postResetPassword', {
      email,
      password: newPassword,
      idesqueci_senha: idToken
    })
  }
}
