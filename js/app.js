// Main application JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // LocalStorage keys
    const STORAGE_KEYS = {
        APP_ID: 'agora_app_id',
        APP_CERTIFICATE: 'agora_app_certificate'
    }
    
    // Load saved App ID and App Certificate from localStorage
    function loadSavedCredentials() {
        const savedAppId = localStorage.getItem(STORAGE_KEYS.APP_ID)
        const savedAppCertificate = localStorage.getItem(STORAGE_KEYS.APP_CERTIFICATE)
        
        if (savedAppId) {
            // Populate all App ID fields
            document.querySelectorAll('[id$="-app-id"]').forEach(field => {
                field.value = savedAppId
            })
        }
        
        if (savedAppCertificate) {
            // Populate all App Certificate fields
            document.querySelectorAll('[id$="-app-certificate"]').forEach(field => {
                field.value = savedAppCertificate
            })
        }
    }
    
    // Save App ID and App Certificate to localStorage
    function saveCredentials(appId, appCertificate) {
        if (appId) {
            localStorage.setItem(STORAGE_KEYS.APP_ID, appId)
        }
        if (appCertificate) {
            localStorage.setItem(STORAGE_KEYS.APP_CERTIFICATE, appCertificate)
        }
    }
    
    // Add event listeners to all App ID and App Certificate fields to save on change
    function setupAutoSave() {
        // App ID fields
        document.querySelectorAll('[id$="-app-id"]').forEach(field => {
            field.addEventListener('change', function() {
                const appId = this.value.trim()
                if (appId) {
                    localStorage.setItem(STORAGE_KEYS.APP_ID, appId)
                    // Sync to all other App ID fields
                    document.querySelectorAll('[id$="-app-id"]').forEach(f => {
                        if (f !== this) {
                            f.value = appId
                        }
                    })
                }
            })
            field.addEventListener('blur', function() {
                const appId = this.value.trim()
                if (appId) {
                    localStorage.setItem(STORAGE_KEYS.APP_ID, appId)
                    // Sync to all other App ID fields
                    document.querySelectorAll('[id$="-app-id"]').forEach(f => {
                        if (f !== this) {
                            f.value = appId
                        }
                    })
                }
            })
        })
        
        // App Certificate fields
        document.querySelectorAll('[id$="-app-certificate"]').forEach(field => {
            field.addEventListener('change', function() {
                const appCertificate = this.value.trim()
                if (appCertificate) {
                    localStorage.setItem(STORAGE_KEYS.APP_CERTIFICATE, appCertificate)
                    // Sync to all other App Certificate fields
                    document.querySelectorAll('[id$="-app-certificate"]').forEach(f => {
                        if (f !== this) {
                            f.value = appCertificate
                        }
                    })
                }
            })
            field.addEventListener('blur', function() {
                const appCertificate = this.value.trim()
                if (appCertificate) {
                    localStorage.setItem(STORAGE_KEYS.APP_CERTIFICATE, appCertificate)
                    // Sync to all other App Certificate fields
                    document.querySelectorAll('[id$="-app-certificate"]').forEach(f => {
                        if (f !== this) {
                            f.value = appCertificate
                        }
                    })
                }
            })
        })
    }
    
    // Load saved credentials on page load
    loadSavedCredentials()
    
    // Setup auto-save functionality
    setupAutoSave()
    
    // Tab switching
    const tabButtons = document.querySelectorAll('.tab-btn')
    const tokenForms = document.querySelectorAll('.token-form')
    
    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const tokenType = btn.dataset.tokenType
            
            // Update active tab
            tabButtons.forEach(b => b.classList.remove('active'))
            btn.classList.add('active')
            
            // Update active form
            tokenForms.forEach(f => f.classList.remove('active'))
            document.getElementById(`${tokenType}-form`).classList.add('active')
            
            // Hide result
            document.getElementById('result-container').style.display = 'none'
        })
    })
    
    // RTC Token Form
    document.getElementById('rtc-token-form').addEventListener('submit', async (e) => {
        e.preventDefault()
        await generateRtcToken()
    })
    
    // RTM Token Form
    document.getElementById('rtm-token-form').addEventListener('submit', async (e) => {
        e.preventDefault()
        await generateRtmToken()
    })
    
    // RTC + RTM Token Form
    document.getElementById('rtc-rtm-token-form').addEventListener('submit', async (e) => {
        e.preventDefault()
        await generateRtcRtmToken()
    })
    
    // Chat Token Form
    document.getElementById('chat-token-form').addEventListener('submit', async (e) => {
        e.preventDefault()
        await generateChatToken()
    })
    
    // Education Token Form
    document.getElementById('education-token-form').addEventListener('submit', async (e) => {
        e.preventDefault()
        await generateEducationToken()
    })
    
    // FPA Token Form
    document.getElementById('fpa-token-form').addEventListener('submit', async (e) => {
        e.preventDefault()
        await generateFpaToken()
    })
    
    // APAAS Token Form
    document.getElementById('apaas-token-form').addEventListener('submit', async (e) => {
        e.preventDefault()
        await generateApaasToken()
    })
    
    // Copy token button
    document.getElementById('copy-token-btn').addEventListener('click', () => {
        const tokenResult = document.getElementById('token-result')
        tokenResult.select()
        document.execCommand('copy')
        alert('Token copied to clipboard!')
    })
    
    // Show/hide individual privileges for RTC
    document.getElementById('rtc-use-privileges').addEventListener('change', (e) => {
        document.getElementById('rtc-privileges').style.display = e.target.checked ? 'block' : 'none'
    })
    
    // Show/hide fields based on token type
    document.getElementById('chat-token-type').addEventListener('change', (e) => {
        document.getElementById('chat-user-uuid-group').style.display = 
            e.target.value === 'user' ? 'block' : 'none'
    })
    
    document.getElementById('edu-token-type').addEventListener('change', (e) => {
        const type = e.target.value
        document.getElementById('edu-room-uuid-group').style.display = type === 'room' ? 'block' : 'none'
        document.getElementById('edu-user-uuid-group').style.display = type !== 'app' ? 'block' : 'none'
        document.getElementById('edu-role-group').style.display = type === 'room' ? 'block' : 'none'
    })
    
    document.getElementById('apaas-token-type').addEventListener('change', (e) => {
        const type = e.target.value
        document.getElementById('apaas-room-uuid-group').style.display = type === 'room' ? 'block' : 'none'
        document.getElementById('apaas-user-uuid-group').style.display = type !== 'app' ? 'block' : 'none'
        document.getElementById('apaas-role-group').style.display = type === 'room' ? 'block' : 'none'
    })
    
    async function generateRtcToken() {
        try {
            const appId = document.getElementById('rtc-app-id').value.trim()
            const appCertificate = document.getElementById('rtc-app-certificate').value.trim()
            
            // Save to localStorage
            saveCredentials(appId, appCertificate)
            
            const channelName = document.getElementById('rtc-channel-name').value.trim()
            const uid = document.getElementById('rtc-uid').value
            const userAccount = document.getElementById('rtc-user-account').value.trim()
            const role = parseInt(document.getElementById('rtc-role').value)
            const tokenExpire = parseInt(document.getElementById('rtc-token-expire').value)
            const privilegeExpire = parseInt(document.getElementById('rtc-privilege-expire').value)
            const usePrivileges = document.getElementById('rtc-use-privileges').checked
            
            let token
            
            if (usePrivileges) {
                const joinExpire = parseInt(document.getElementById('rtc-join-expire').value)
                const audioExpire = parseInt(document.getElementById('rtc-audio-expire').value)
                const videoExpire = parseInt(document.getElementById('rtc-video-expire').value)
                const dataExpire = parseInt(document.getElementById('rtc-data-expire').value)
                
                if (uid) {
                    token = await RtcTokenBuilder.buildTokenWithUidAndPrivilege(
                        appId, appCertificate, channelName, parseInt(uid),
                        tokenExpire, joinExpire, audioExpire, videoExpire, dataExpire
                    )
                } else {
                    token = await RtcTokenBuilder.BuildTokenWithUserAccountAndPrivilege(
                        appId, appCertificate, channelName, userAccount || '0',
                        tokenExpire, joinExpire, audioExpire, videoExpire, dataExpire
                    )
                }
            } else {
                if (uid) {
                    token = await RtcTokenBuilder.buildTokenWithUid(
                        appId, appCertificate, channelName, parseInt(uid),
                        role, tokenExpire, privilegeExpire
                    )
                } else {
                    token = await RtcTokenBuilder.buildTokenWithUserAccount(
                        appId, appCertificate, channelName, userAccount || '0',
                        role, tokenExpire, privilegeExpire
                    )
                }
            }
            
            showResult(token)
        } catch (error) {
            alert('Error generating token: ' + error.message)
            console.error(error)
        }
    }
    
    async function generateRtmToken() {
        try {
            const appId = document.getElementById('rtm-app-id').value.trim()
            const appCertificate = document.getElementById('rtm-app-certificate').value.trim()
            
            // Save to localStorage
            saveCredentials(appId, appCertificate)
            
            const userId = document.getElementById('rtm-user-id').value.trim()
            const expire = parseInt(document.getElementById('rtm-expire').value)
            
            const token = await RtmTokenBuilder.buildToken(appId, appCertificate, userId, expire)
            showResult(token)
        } catch (error) {
            alert('Error generating token: ' + error.message)
            console.error(error)
        }
    }
    
    async function generateRtcRtmToken() {
        try {
            const appId = document.getElementById('rtc-rtm-app-id').value.trim()
            const appCertificate = document.getElementById('rtc-rtm-app-certificate').value.trim()
            
            // Save to localStorage
            saveCredentials(appId, appCertificate)
            
            const channelName = document.getElementById('rtc-rtm-channel-name').value.trim()
            const userAccount = document.getElementById('rtc-rtm-user-account').value.trim()
            const role = parseInt(document.getElementById('rtc-rtm-role').value)
            const tokenExpire = parseInt(document.getElementById('rtc-rtm-token-expire').value)
            const privilegeExpire = parseInt(document.getElementById('rtc-rtm-privilege-expire').value)
            
            if (!userAccount) {
                alert('User account is required')
                return
            }
            
            const token = await RtcTokenBuilder.buildTokenWithRtm(
                appId, appCertificate, channelName, userAccount,
                role, tokenExpire, privilegeExpire
            )
            showResult(token)
        } catch (error) {
            alert('Error generating token: ' + error.message)
            console.error(error)
        }
    }
    
    async function generateChatToken() {
        try {
            const appId = document.getElementById('chat-app-id').value.trim()
            const appCertificate = document.getElementById('chat-app-certificate').value.trim()
            
            // Save to localStorage
            saveCredentials(appId, appCertificate)
            
            const tokenType = document.getElementById('chat-token-type').value
            const expire = parseInt(document.getElementById('chat-expire').value)
            
            let token
            if (tokenType === 'user') {
                const userUuid = document.getElementById('chat-user-uuid').value.trim()
                if (!userUuid) {
                    alert('User UUID is required for user token')
                    return
                }
                token = await ChatTokenBuilder.buildUserToken(appId, appCertificate, userUuid, expire)
            } else {
                token = await ChatTokenBuilder.buildAppToken(appId, appCertificate, expire)
            }
            
            showResult(token)
        } catch (error) {
            alert('Error generating token: ' + error.message)
            console.error(error)
        }
    }
    
    async function generateEducationToken() {
        try {
            const appId = document.getElementById('edu-app-id').value.trim()
            const appCertificate = document.getElementById('edu-app-certificate').value.trim()
            
            // Save to localStorage
            saveCredentials(appId, appCertificate)
            
            const tokenType = document.getElementById('edu-token-type').value
            const expire = parseInt(document.getElementById('edu-expire').value)
            
            let token
            if (tokenType === 'room') {
                const roomUuid = document.getElementById('edu-room-uuid').value.trim()
                const userUuid = document.getElementById('edu-user-uuid').value.trim()
                const role = parseInt(document.getElementById('edu-role').value)
                if (!roomUuid || !userUuid) {
                    alert('Room UUID and User UUID are required for room token')
                    return
                }
                token = await EducationTokenBuilder.buildRoomUserToken(
                    appId, appCertificate, roomUuid, userUuid, role, expire
                )
            } else if (tokenType === 'user') {
                const userUuid = document.getElementById('edu-user-uuid').value.trim()
                if (!userUuid) {
                    alert('User UUID is required for user token')
                    return
                }
                token = await EducationTokenBuilder.buildUserToken(appId, appCertificate, userUuid, expire)
            } else {
                token = await EducationTokenBuilder.buildAppToken(appId, appCertificate, expire)
            }
            
            showResult(token)
        } catch (error) {
            alert('Error generating token: ' + error.message)
            console.error(error)
        }
    }
    
    async function generateFpaToken() {
        try {
            const appId = document.getElementById('fpa-app-id').value.trim()
            const appCertificate = document.getElementById('fpa-app-certificate').value.trim()
            
            // Save to localStorage
            saveCredentials(appId, appCertificate)
            
            const token = await FpaTokenBuilder.buildToken(appId, appCertificate)
            showResult(token)
        } catch (error) {
            alert('Error generating token: ' + error.message)
            console.error(error)
        }
    }
    
    async function generateApaasToken() {
        try {
            const appId = document.getElementById('apaas-app-id').value.trim()
            const appCertificate = document.getElementById('apaas-app-certificate').value.trim()
            
            // Save to localStorage
            saveCredentials(appId, appCertificate)
            
            const tokenType = document.getElementById('apaas-token-type').value
            const expire = parseInt(document.getElementById('apaas-expire').value)
            
            let token
            if (tokenType === 'room') {
                const roomUuid = document.getElementById('apaas-room-uuid').value.trim()
                const userUuid = document.getElementById('apaas-user-uuid').value.trim()
                const role = parseInt(document.getElementById('apaas-role').value)
                if (!roomUuid || !userUuid) {
                    alert('Room UUID and User UUID are required for room token')
                    return
                }
                token = await ApaasTokenBuilder.buildRoomUserToken(
                    appId, appCertificate, roomUuid, userUuid, role, expire
                )
            } else if (tokenType === 'user') {
                const userUuid = document.getElementById('apaas-user-uuid').value.trim()
                if (!userUuid) {
                    alert('User UUID is required for user token')
                    return
                }
                token = await ApaasTokenBuilder.buildUserToken(appId, appCertificate, userUuid, expire)
            } else {
                token = await ApaasTokenBuilder.buildAppToken(appId, appCertificate, expire)
            }
            
            showResult(token)
        } catch (error) {
            alert('Error generating token: ' + error.message)
            console.error(error)
        }
    }
    
    function showResult(token) {
        document.getElementById('token-result').value = token
        document.getElementById('result-container').style.display = 'block'
        document.getElementById('result-container').scrollIntoView({ behavior: 'smooth' })
    }
})
