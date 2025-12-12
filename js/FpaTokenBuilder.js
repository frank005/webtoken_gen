// Browser-compatible FpaTokenBuilder.js

class FpaTokenBuilder {
    static async buildToken(appId, appCertificate) {
        let token = new AccessToken2(appId, appCertificate, 0, 24 * 3600)

        let serviceFpa = new ServiceFpa()
        serviceFpa.add_privilege(ServiceFpa.kPrivilegeLogin, 0)
        token.add_service(serviceFpa)

        return await token.build()
    }
}

window.FpaTokenBuilder = FpaTokenBuilder
