// Browser-compatible EducationTokenBuilder.js

class EducationTokenBuilder {
    static async buildRoomUserToken(appId, appCertificate, roomUuid, userUuid, role, expire) {
        let accessToken = new AccessToken2(appId, appCertificate, 0, expire)

        let chatUserId = md5(userUuid)
        let apaasService = new ServiceApaas(roomUuid, userUuid, role)
        accessToken.add_service(apaasService)

        let rtmService = new ServiceRtm(userUuid)
        rtmService.add_privilege(ServiceRtm.kPrivilegeLogin, expire)
        accessToken.add_service(rtmService)

        let chatService = new ServiceChat(chatUserId)
        chatService.add_privilege(ServiceChat.kPrivilegeUser, expire)
        accessToken.add_service(chatService)

        return await accessToken.build()
    }

    static async buildUserToken(appId, appCertificate, userUuid, expire) {
        let accessToken = new AccessToken2(appId, appCertificate, 0, expire)
        let apaasService = new ServiceApaas('', userUuid)
        apaasService.add_privilege(ServiceApaas.PRIVILEGE_USER, expire)
        accessToken.add_service(apaasService)

        return await accessToken.build()
    }

    static async buildAppToken(appId, appCertificate, expire) {
        let accessToken = new AccessToken2(appId, appCertificate, 0, expire)
        let apaasService = new ServiceApaas()
        apaasService.add_privilege(ServiceApaas.PRIVILEGE_APP, expire)
        accessToken.add_service(apaasService)

        return await accessToken.build()
    }
}

window.EducationTokenBuilder = EducationTokenBuilder
