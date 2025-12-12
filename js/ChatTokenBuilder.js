// Browser-compatible ChatTokenBuilder.js

class ChatTokenBuilder {
    static async buildUserToken(appId, appCertificate, userUuid, expire) {
        const token = new AccessToken2(appId, appCertificate, null, expire)
        const serviceChat = new ServiceChat(userUuid)
        serviceChat.add_privilege(ServiceChat.kPrivilegeUser, expire)
        token.add_service(serviceChat)
        return await token.build()
    }

    static async buildAppToken(appId, appCertificate, expire) {
        const token = new AccessToken2(appId, appCertificate, null, expire)
        const serviceChat = new ServiceChat()
        serviceChat.add_privilege(ServiceChat.kPrivilegeApp, expire)
        token.add_service(serviceChat)
        return await token.build()
    }
}

window.ChatTokenBuilder = ChatTokenBuilder
