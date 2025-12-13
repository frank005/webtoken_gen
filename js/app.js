// Main application JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // LocalStorage keys
    const STORAGE_KEYS = {
        APP_ID: 'agora_app_id',
        APP_CERTIFICATE: 'agora_app_certificate'
    }
    
    // Get credentials from localStorage
    function getCredentials() {
        return {
            appId: localStorage.getItem(STORAGE_KEYS.APP_ID) || '',
            appCertificate: localStorage.getItem(STORAGE_KEYS.APP_CERTIFICATE) || ''
        }
    }
    
    // Save credentials to localStorage
    function saveCredentials(appId, appCertificate) {
        if (appId) {
            localStorage.setItem(STORAGE_KEYS.APP_ID, appId.trim())
        }
        if (appCertificate) {
            localStorage.setItem(STORAGE_KEYS.APP_CERTIFICATE, appCertificate.trim())
        }
    }
    
    // Show modal and hide main container
    function showCredentialsModal() {
        const modal = document.getElementById('credentials-modal')
        const mainContainer = document.getElementById('main-container')
        const savedCredentials = getCredentials()
        
        // Pre-fill with saved credentials if they exist
        if (savedCredentials.appId) {
            document.getElementById('modal-app-id').value = savedCredentials.appId
        }
        if (savedCredentials.appCertificate) {
            document.getElementById('modal-app-certificate').value = savedCredentials.appCertificate
        }
        
        modal.classList.add('show')
        mainContainer.style.display = 'none'
    }
    
    // Hide modal and show main container
    function hideCredentialsModal() {
        const modal = document.getElementById('credentials-modal')
        const mainContainer = document.getElementById('main-container')
        
        modal.classList.remove('show')
        mainContainer.style.display = 'block'
    }
    
    // Check if credentials exist and show/hide accordingly
    function checkCredentials() {
        const credentials = getCredentials()
        if (credentials.appId && credentials.appCertificate) {
            hideCredentialsModal()
        } else {
            showCredentialsModal()
        }
    }
    
    // Handle credentials form submission
    document.getElementById('credentials-form').addEventListener('submit', (e) => {
        e.preventDefault()
        const appId = document.getElementById('modal-app-id').value.trim()
        const appCertificate = document.getElementById('modal-app-certificate').value.trim()
        
        if (!appId || !appCertificate) {
            alert('Please enter both App ID and App Certificate')
            return
        }
        
        saveCredentials(appId, appCertificate)
        hideCredentialsModal()
    })
    
    // Handle change credentials button
    document.getElementById('change-credentials-btn').addEventListener('click', () => {
        showCredentialsModal()
    })
    
    // Check credentials on page load
    checkCredentials()
    
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
            
            // Hide result and reset to single display
            document.getElementById('result-container').style.display = 'none'
            document.getElementById('result-box-dual').style.display = 'none'
            document.getElementById('result-box').style.display = 'flex'
        })
    })
    
    // RTC Token Form
    document.getElementById('rtc-token-form').addEventListener('submit', async (e) => {
        e.preventDefault()
        await generateRtcToken()
    })
    
    // RTC Quick Generate Button
    document.getElementById('rtc-quick-generate-btn').addEventListener('click', async (e) => {
        e.preventDefault()
        await quickGenerateRtcTokens()
    })
    
    // RTM Token Form
    document.getElementById('rtm-token-form').addEventListener('submit', async (e) => {
        e.preventDefault()
        await generateRtmToken()
    })
    
    // RTM Quick Generate Button
    document.getElementById('rtm-quick-generate-btn').addEventListener('click', async (e) => {
        e.preventDefault()
        await quickGenerateRtmTokens()
    })
    
    // RTC + RTM Token Form
    document.getElementById('rtc-rtm-token-form').addEventListener('submit', async (e) => {
        e.preventDefault()
        await generateRtcRtmToken()
    })
    
    // RTC + RTM Quick Generate Button
    document.getElementById('rtc-rtm-quick-generate-btn').addEventListener('click', async (e) => {
        e.preventDefault()
        await quickGenerateRtcRtmTokens()
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
    
    // Copy buttons for dual tokens (using event delegation since they're created dynamically)
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('copy-token-btn')) {
            const tokenNum = e.target.dataset.token
            const tokenResult = document.getElementById(`token-result-${tokenNum}`)
            tokenResult.select()
            document.execCommand('copy')
            alert(`Token ${tokenNum} copied to clipboard!`)
        }
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
            const credentials = getCredentials()
            if (!credentials.appId || !credentials.appCertificate) {
                alert('Please set your App ID and App Certificate first')
                showCredentialsModal()
                return
            }
            
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
                        credentials.appId, credentials.appCertificate, channelName, parseInt(uid),
                        tokenExpire, joinExpire, audioExpire, videoExpire, dataExpire
                    )
                } else {
                    token = await RtcTokenBuilder.BuildTokenWithUserAccountAndPrivilege(
                        credentials.appId, credentials.appCertificate, channelName, userAccount || '0',
                        tokenExpire, joinExpire, audioExpire, videoExpire, dataExpire
                    )
                }
            } else {
                if (uid) {
                    token = await RtcTokenBuilder.buildTokenWithUid(
                        credentials.appId, credentials.appCertificate, channelName, parseInt(uid),
                        role, tokenExpire, privilegeExpire
                    )
                } else {
                    token = await RtcTokenBuilder.buildTokenWithUserAccount(
                        credentials.appId, credentials.appCertificate, channelName, userAccount || '0',
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
            const credentials = getCredentials()
            if (!credentials.appId || !credentials.appCertificate) {
                alert('Please set your App ID and App Certificate first')
                showCredentialsModal()
                return
            }
            
            const userId = document.getElementById('rtm-user-id').value.trim()
            const expire = parseInt(document.getElementById('rtm-expire').value)
            
            const token = await RtmTokenBuilder.buildToken(credentials.appId, credentials.appCertificate, userId, expire)
            showResult(token)
        } catch (error) {
            alert('Error generating token: ' + error.message)
            console.error(error)
        }
    }
    
    async function generateRtcRtmToken() {
        try {
            const credentials = getCredentials()
            if (!credentials.appId || !credentials.appCertificate) {
                alert('Please set your App ID and App Certificate first')
                showCredentialsModal()
                return
            }
            
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
                credentials.appId, credentials.appCertificate, channelName, userAccount,
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
            const credentials = getCredentials()
            if (!credentials.appId || !credentials.appCertificate) {
                alert('Please set your App ID and App Certificate first')
                showCredentialsModal()
                return
            }
            
            const tokenType = document.getElementById('chat-token-type').value
            const expire = parseInt(document.getElementById('chat-expire').value)
            
            let token
            if (tokenType === 'user') {
                const userUuid = document.getElementById('chat-user-uuid').value.trim()
                if (!userUuid) {
                    alert('User UUID is required for user token')
                    return
                }
                token = await ChatTokenBuilder.buildUserToken(credentials.appId, credentials.appCertificate, userUuid, expire)
            } else {
                token = await ChatTokenBuilder.buildAppToken(credentials.appId, credentials.appCertificate, expire)
            }
            
            showResult(token)
        } catch (error) {
            alert('Error generating token: ' + error.message)
            console.error(error)
        }
    }
    
    async function generateEducationToken() {
        try {
            const credentials = getCredentials()
            if (!credentials.appId || !credentials.appCertificate) {
                alert('Please set your App ID and App Certificate first')
                showCredentialsModal()
                return
            }
            
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
                    credentials.appId, credentials.appCertificate, roomUuid, userUuid, role, expire
                )
            } else if (tokenType === 'user') {
                const userUuid = document.getElementById('edu-user-uuid').value.trim()
                if (!userUuid) {
                    alert('User UUID is required for user token')
                    return
                }
                token = await EducationTokenBuilder.buildUserToken(credentials.appId, credentials.appCertificate, userUuid, expire)
            } else {
                token = await EducationTokenBuilder.buildAppToken(credentials.appId, credentials.appCertificate, expire)
            }
            
            showResult(token)
        } catch (error) {
            alert('Error generating token: ' + error.message)
            console.error(error)
        }
    }
    
    async function generateFpaToken() {
        try {
            const credentials = getCredentials()
            if (!credentials.appId || !credentials.appCertificate) {
                alert('Please set your App ID and App Certificate first')
                showCredentialsModal()
                return
            }
            
            const token = await FpaTokenBuilder.buildToken(credentials.appId, credentials.appCertificate)
            showResult(token)
        } catch (error) {
            alert('Error generating token: ' + error.message)
            console.error(error)
        }
    }
    
    async function generateApaasToken() {
        try {
            const credentials = getCredentials()
            if (!credentials.appId || !credentials.appCertificate) {
                alert('Please set your App ID and App Certificate first')
                showCredentialsModal()
                return
            }
            
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
                    credentials.appId, credentials.appCertificate, roomUuid, userUuid, role, expire
                )
            } else if (tokenType === 'user') {
                const userUuid = document.getElementById('apaas-user-uuid').value.trim()
                if (!userUuid) {
                    alert('User UUID is required for user token')
                    return
                }
                token = await ApaasTokenBuilder.buildUserToken(credentials.appId, credentials.appCertificate, userUuid, expire)
            } else {
                token = await ApaasTokenBuilder.buildAppToken(credentials.appId, credentials.appCertificate, expire)
            }
            
            showResult(token)
        } catch (error) {
            alert('Error generating token: ' + error.message)
            console.error(error)
        }
    }
    
    async function quickGenerateRtcTokens() {
        try {
            const credentials = getCredentials()
            if (!credentials.appId || !credentials.appCertificate) {
                alert('Please set your App ID and App Certificate first')
                showCredentialsModal()
                return
            }
            
            const channelName = document.getElementById('rtc-channel-name').value.trim()
            if (!channelName) {
                alert('Please enter a channel name')
                return
            }
            
            const uid = document.getElementById('rtc-uid').value.trim()
            const userAccount = document.getElementById('rtc-user-account').value.trim()
            const role = parseInt(document.getElementById('rtc-role').value)
            const tokenExpire = parseInt(document.getElementById('rtc-token-expire').value)
            const privilegeExpire = parseInt(document.getElementById('rtc-privilege-expire').value)
            const usePrivileges = document.getElementById('rtc-use-privileges').checked
            
            let token1, token2
            let identifier1, identifier2
            
            // Determine identifiers based on what's filled
            if (uid && uid !== '') {
                // Use UID and UID+1
                identifier1 = parseInt(uid)
                identifier2 = identifier1 + 1
            } else if (userAccount && userAccount !== '') {
                // Use name and name1
                identifier1 = userAccount
                identifier2 = userAccount + '1'
            } else {
                // Generate random UIDs
                identifier1 = Math.floor(Math.random() * 1000000)
                identifier2 = identifier1 + 1
            }
            
            // Generate first token
            if (usePrivileges) {
                const joinExpire = parseInt(document.getElementById('rtc-join-expire').value)
                const audioExpire = parseInt(document.getElementById('rtc-audio-expire').value)
                const videoExpire = parseInt(document.getElementById('rtc-video-expire').value)
                const dataExpire = parseInt(document.getElementById('rtc-data-expire').value)
                
                if (typeof identifier1 === 'number') {
                    token1 = await RtcTokenBuilder.buildTokenWithUidAndPrivilege(
                        credentials.appId, credentials.appCertificate, channelName, identifier1,
                        tokenExpire, joinExpire, audioExpire, videoExpire, dataExpire
                    )
                    token2 = await RtcTokenBuilder.buildTokenWithUidAndPrivilege(
                        credentials.appId, credentials.appCertificate, channelName, identifier2,
                        tokenExpire, joinExpire, audioExpire, videoExpire, dataExpire
                    )
                } else {
                    token1 = await RtcTokenBuilder.BuildTokenWithUserAccountAndPrivilege(
                        credentials.appId, credentials.appCertificate, channelName, identifier1,
                        tokenExpire, joinExpire, audioExpire, videoExpire, dataExpire
                    )
                    token2 = await RtcTokenBuilder.BuildTokenWithUserAccountAndPrivilege(
                        credentials.appId, credentials.appCertificate, channelName, identifier2,
                        tokenExpire, joinExpire, audioExpire, videoExpire, dataExpire
                    )
                }
            } else {
                if (typeof identifier1 === 'number') {
                    token1 = await RtcTokenBuilder.buildTokenWithUid(
                        credentials.appId, credentials.appCertificate, channelName, identifier1,
                        role, tokenExpire, privilegeExpire
                    )
                    token2 = await RtcTokenBuilder.buildTokenWithUid(
                        credentials.appId, credentials.appCertificate, channelName, identifier2,
                        role, tokenExpire, privilegeExpire
                    )
                } else {
                    token1 = await RtcTokenBuilder.buildTokenWithUserAccount(
                        credentials.appId, credentials.appCertificate, channelName, identifier1,
                        role, tokenExpire, privilegeExpire
                    )
                    token2 = await RtcTokenBuilder.buildTokenWithUserAccount(
                        credentials.appId, credentials.appCertificate, channelName, identifier2,
                        role, tokenExpire, privilegeExpire
                    )
                }
            }
            
            showDualResult(token1, token2, identifier1, identifier2)
        } catch (error) {
            alert('Error generating tokens: ' + error.message)
            console.error(error)
        }
    }
    
    async function quickGenerateRtmTokens() {
        try {
            const credentials = getCredentials()
            if (!credentials.appId || !credentials.appCertificate) {
                alert('Please set your App ID and App Certificate first')
                showCredentialsModal()
                return
            }
            
            const userId = document.getElementById('rtm-user-id').value.trim()
            const expire = parseInt(document.getElementById('rtm-expire').value)
            
            let identifier1, identifier2
            
            // Determine identifiers based on what's filled
            if (userId) {
                // Use name and name1
                identifier1 = userId
                identifier2 = userId + '1'
            } else {
                // Generate random user IDs
                identifier1 = 'name'
                identifier2 = 'name1'
            }
            
            const token1 = await RtmTokenBuilder.buildToken(credentials.appId, credentials.appCertificate, identifier1, expire)
            const token2 = await RtmTokenBuilder.buildToken(credentials.appId, credentials.appCertificate, identifier2, expire)
            
            showDualResult(token1, token2, identifier1, identifier2)
        } catch (error) {
            alert('Error generating tokens: ' + error.message)
            console.error(error)
        }
    }
    
    async function quickGenerateRtcRtmTokens() {
        try {
            const credentials = getCredentials()
            if (!credentials.appId || !credentials.appCertificate) {
                alert('Please set your App ID and App Certificate first')
                showCredentialsModal()
                return
            }
            
            const channelName = document.getElementById('rtc-rtm-channel-name').value.trim()
            if (!channelName) {
                alert('Please enter a channel name')
                return
            }
            
            const userAccount = document.getElementById('rtc-rtm-user-account').value.trim()
            const role = parseInt(document.getElementById('rtc-rtm-role').value)
            const tokenExpire = parseInt(document.getElementById('rtc-rtm-token-expire').value)
            const privilegeExpire = parseInt(document.getElementById('rtc-rtm-privilege-expire').value)
            
            let identifier1, identifier2
            
            // Determine identifiers based on what's filled
            if (userAccount) {
                // Use name and name1
                identifier1 = userAccount
                identifier2 = userAccount + '1'
            } else {
                // Generate default names
                identifier1 = 'name'
                identifier2 = 'name1'
            }
            
            const token1 = await RtcTokenBuilder.buildTokenWithRtm(
                credentials.appId, credentials.appCertificate, channelName, identifier1,
                role, tokenExpire, privilegeExpire
            )
            const token2 = await RtcTokenBuilder.buildTokenWithRtm(
                credentials.appId, credentials.appCertificate, channelName, identifier2,
                role, tokenExpire, privilegeExpire
            )
            
            showDualResult(token1, token2, identifier1, identifier2)
        } catch (error) {
            alert('Error generating tokens: ' + error.message)
            console.error(error)
        }
    }
    
    function showResult(token) {
        // Hide dual result, show single result
        document.getElementById('result-box-dual').style.display = 'none'
        document.getElementById('result-box').style.display = 'flex'
        document.getElementById('result-title').textContent = 'Generated Token'
        document.getElementById('token-result').value = token
        document.getElementById('result-container').style.display = 'block'
        document.getElementById('result-container').scrollIntoView({ behavior: 'smooth' })
    }
    
    function showDualResult(token1, token2, identifier1, identifier2) {
        // Hide single result, show dual result
        document.getElementById('result-box').style.display = 'none'
        document.getElementById('result-box-dual').style.display = 'block'
        document.getElementById('result-title').textContent = `Generated Tokens (ID: ${identifier1} & ${identifier2})`
        document.getElementById('token-result-1').value = token1
        document.getElementById('token-result-2').value = token2
        document.getElementById('result-container').style.display = 'block'
        document.getElementById('result-container').scrollIntoView({ behavior: 'smooth' })
    }
})
