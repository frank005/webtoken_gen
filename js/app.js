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
    const tabButtons = document.querySelectorAll('.tab-btn:not(.more-tokens-btn)')
    const tokenForms = document.querySelectorAll('.token-form')
    const moreTokensBtn = document.getElementById('more-tokens-btn')
    const moreTokensMenu = document.getElementById('more-tokens-menu')
    const moreTokensDropdown = document.querySelector('.more-tokens-dropdown')
    const dropdownItems = document.querySelectorAll('.dropdown-item')
    
    // Handle main tab buttons (excluding the "More Tokens" button)
    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const tokenType = btn.dataset.tokenType
            if (!tokenType) return
            
            // Close dropdown if open
            moreTokensDropdown.classList.remove('active')
            moreTokensMenu.style.display = 'none'
            
            // Update active tab
            tabButtons.forEach(b => b.classList.remove('active'))
            dropdownItems.forEach(item => item.classList.remove('active'))
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
    
    // Handle "More Tokens" dropdown button
    moreTokensBtn.addEventListener('click', (e) => {
        e.stopPropagation()
        const isActive = moreTokensDropdown.classList.contains('active')
        
        if (isActive) {
            moreTokensDropdown.classList.remove('active')
            moreTokensMenu.style.display = 'none'
        } else {
            moreTokensDropdown.classList.add('active')
            moreTokensMenu.style.display = 'block'
        }
    })
    
    // Handle dropdown items
    dropdownItems.forEach(item => {
        item.addEventListener('click', () => {
            const tokenType = item.dataset.tokenType
            if (!tokenType) return
            
            // Close dropdown
            moreTokensDropdown.classList.remove('active')
            moreTokensMenu.style.display = 'none'
            
            // Update active tab
            tabButtons.forEach(b => b.classList.remove('active'))
            dropdownItems.forEach(i => i.classList.remove('active'))
            item.classList.add('active')
            
            // Update active form
            tokenForms.forEach(f => f.classList.remove('active'))
            document.getElementById(`${tokenType}-form`).classList.add('active')
            
            // Hide result and reset to single display
            document.getElementById('result-container').style.display = 'none'
            document.getElementById('result-box-dual').style.display = 'none'
            document.getElementById('result-box').style.display = 'flex'
        })
    })
    
    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!moreTokensDropdown.contains(e.target)) {
            moreTokensDropdown.classList.remove('active')
            moreTokensMenu.style.display = 'none'
        }
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
    
    // Chat Quick Generate Button
    document.getElementById('chat-quick-generate-btn').addEventListener('click', async (e) => {
        e.preventDefault()
        await quickGenerateChatTokens()
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
        const isUserToken = e.target.value === 'user'
        document.getElementById('chat-user-uuid-group').style.display = isUserToken ? 'block' : 'none'
        document.getElementById('chat-token-count-group').style.display = isUserToken ? 'block' : 'none'
        document.getElementById('chat-quick-generate-btn').style.display = isUserToken ? 'block' : 'none'
        updateChatQuickGenerateButtonText()
    })
    
    // Update quick generate button text based on token count
    function updateChatQuickGenerateButtonText() {
        const tokenCount = document.getElementById('chat-token-count').value
        const btn = document.getElementById('chat-quick-generate-btn')
        btn.textContent = `⚡ Quick Generate (${tokenCount} Tokens)`
    }
    
    // Update button text when token count changes
    document.getElementById('chat-token-count').addEventListener('change', updateChatQuickGenerateButtonText)
    
    // Initialize chat form visibility on load
    const chatTokenType = document.getElementById('chat-token-type').value
    if (chatTokenType === 'user') {
        document.getElementById('chat-token-count-group').style.display = 'block'
        document.getElementById('chat-quick-generate-btn').style.display = 'block'
        updateChatQuickGenerateButtonText()
    }
    
    // Update quick generate button text for RTC, RTM, and RTC+RTM
    function updateQuickGenerateButtonText(formPrefix) {
        const tokenCount = document.getElementById(`${formPrefix}-token-count`).value
        const btn = document.getElementById(`${formPrefix}-quick-generate-btn`)
        btn.textContent = `⚡ Quick Generate (${tokenCount} Tokens)`
    }
    
    // Add event listeners for token count changes
    document.getElementById('rtc-token-count').addEventListener('change', () => updateQuickGenerateButtonText('rtc'))
    document.getElementById('rtm-token-count').addEventListener('change', () => updateQuickGenerateButtonText('rtm'))
    document.getElementById('rtc-rtm-token-count').addEventListener('change', () => updateQuickGenerateButtonText('rtc-rtm'))
    
    // Initialize button text on load
    updateQuickGenerateButtonText('rtc')
    updateQuickGenerateButtonText('rtm')
    updateQuickGenerateButtonText('rtc-rtm')
    
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
            
            const tokenCount = parseInt(document.getElementById('rtc-token-count').value)
            const uid = document.getElementById('rtc-uid').value.trim()
            const userAccount = document.getElementById('rtc-user-account').value.trim()
            const role = parseInt(document.getElementById('rtc-role').value)
            const tokenExpire = parseInt(document.getElementById('rtc-token-expire').value)
            const privilegeExpire = parseInt(document.getElementById('rtc-privilege-expire').value)
            const usePrivileges = document.getElementById('rtc-use-privileges').checked
            
            const tokens = []
            const identifiers = []
            
            // Determine base identifier
            let baseIdentifier
            let isNumeric = false
            if (uid && uid !== '') {
                baseIdentifier = parseInt(uid)
                isNumeric = true
            } else if (userAccount && userAccount !== '') {
                baseIdentifier = userAccount
            } else {
                baseIdentifier = Math.floor(Math.random() * 1000000)
                isNumeric = true
            }
            
            // Generate identifiers
            for (let i = 0; i < tokenCount; i++) {
                if (isNumeric) {
                    identifiers.push(baseIdentifier + i)
                } else {
                    identifiers.push(i === 0 ? baseIdentifier : baseIdentifier + i)
                }
            }
            
            // Generate tokens
            if (usePrivileges) {
                const joinExpire = parseInt(document.getElementById('rtc-join-expire').value)
                const audioExpire = parseInt(document.getElementById('rtc-audio-expire').value)
                const videoExpire = parseInt(document.getElementById('rtc-video-expire').value)
                const dataExpire = parseInt(document.getElementById('rtc-data-expire').value)
                
                for (const identifier of identifiers) {
                    if (isNumeric) {
                        tokens.push(await RtcTokenBuilder.buildTokenWithUidAndPrivilege(
                            credentials.appId, credentials.appCertificate, channelName, identifier,
                            tokenExpire, joinExpire, audioExpire, videoExpire, dataExpire
                        ))
                    } else {
                        tokens.push(await RtcTokenBuilder.BuildTokenWithUserAccountAndPrivilege(
                            credentials.appId, credentials.appCertificate, channelName, identifier,
                            tokenExpire, joinExpire, audioExpire, videoExpire, dataExpire
                        ))
                    }
                }
            } else {
                for (const identifier of identifiers) {
                    if (isNumeric) {
                        tokens.push(await RtcTokenBuilder.buildTokenWithUid(
                            credentials.appId, credentials.appCertificate, channelName, identifier,
                            role, tokenExpire, privilegeExpire
                        ))
                    } else {
                        tokens.push(await RtcTokenBuilder.buildTokenWithUserAccount(
                            credentials.appId, credentials.appCertificate, channelName, identifier,
                            role, tokenExpire, privilegeExpire
                        ))
                    }
                }
            }
            
            showMultipleResults(tokens, identifiers)
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
            
            const tokenCount = parseInt(document.getElementById('rtm-token-count').value)
            const userId = document.getElementById('rtm-user-id').value.trim()
            const expire = parseInt(document.getElementById('rtm-expire').value)
            
            const tokens = []
            const identifiers = []
            
            // Determine base identifier
            const baseIdentifier = userId || 'name'
            
            // Generate identifiers
            for (let i = 0; i < tokenCount; i++) {
                identifiers.push(i === 0 ? baseIdentifier : baseIdentifier + i)
            }
            
            // Generate tokens
            for (const identifier of identifiers) {
                tokens.push(await RtmTokenBuilder.buildToken(credentials.appId, credentials.appCertificate, identifier, expire))
            }
            
            showMultipleResults(tokens, identifiers)
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
            
            const tokenCount = parseInt(document.getElementById('rtc-rtm-token-count').value)
            const userAccount = document.getElementById('rtc-rtm-user-account').value.trim()
            const role = parseInt(document.getElementById('rtc-rtm-role').value)
            const tokenExpire = parseInt(document.getElementById('rtc-rtm-token-expire').value)
            const privilegeExpire = parseInt(document.getElementById('rtc-rtm-privilege-expire').value)
            
            const tokens = []
            const identifiers = []
            
            // Determine base identifier
            const baseIdentifier = userAccount || 'name'
            
            // Generate identifiers
            for (let i = 0; i < tokenCount; i++) {
                identifiers.push(i === 0 ? baseIdentifier : baseIdentifier + i)
            }
            
            // Generate tokens
            for (const identifier of identifiers) {
                tokens.push(await RtcTokenBuilder.buildTokenWithRtm(
                    credentials.appId, credentials.appCertificate, channelName, identifier,
                    role, tokenExpire, privilegeExpire
                ))
            }
            
            showMultipleResults(tokens, identifiers)
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
    
    async function quickGenerateChatTokens() {
        try {
            const credentials = getCredentials()
            if (!credentials.appId || !credentials.appCertificate) {
                alert('Please set your App ID and App Certificate first')
                showCredentialsModal()
                return
            }
            
            const tokenType = document.getElementById('chat-token-type').value
            if (tokenType !== 'user') {
                alert('Quick Generate is only available for User Tokens')
                return
            }
            
            const baseUserUuid = document.getElementById('chat-user-uuid').value.trim()
            if (!baseUserUuid) {
                alert('Please enter a User UUID')
                return
            }
            
            const tokenCount = parseInt(document.getElementById('chat-token-count').value)
            const expire = parseInt(document.getElementById('chat-expire').value)
            
            const tokens = []
            const identifiers = []
            
            // Generate tokens with base UUID and numbered suffixes
            for (let i = 0; i < tokenCount; i++) {
                const userUuid = i === 0 ? baseUserUuid : baseUserUuid + i
                const token = await ChatTokenBuilder.buildUserToken(credentials.appId, credentials.appCertificate, userUuid, expire)
                tokens.push(token)
                identifiers.push(userUuid)
            }
            
            showMultipleResults(tokens, identifiers)
        } catch (error) {
            alert('Error generating tokens: ' + error.message)
            console.error(error)
        }
    }
    
    function showDualResult(token1, token2, identifier1, identifier2) {
        // Hide single result, show dual result
        document.getElementById('result-box').style.display = 'none'
        document.getElementById('result-box-dual').style.display = 'block'
        document.getElementById('result-title').textContent = `Generated Tokens (ID: ${identifier1} & ${identifier2})`
        
        const container = document.getElementById('token-pair-container')
        container.innerHTML = `
            <div class="token-item">
                <label>Token 1:</label>
                <textarea id="token-result-1" readonly>${token1}</textarea>
                <button class="copy-token-btn" data-token="1">Copy Token 1</button>
            </div>
            <div class="token-item">
                <label>Token 2:</label>
                <textarea id="token-result-2" readonly>${token2}</textarea>
                <button class="copy-token-btn" data-token="2">Copy Token 2</button>
            </div>
        `
        
        document.getElementById('result-container').style.display = 'block'
        document.getElementById('result-container').scrollIntoView({ behavior: 'smooth' })
    }
    
    function showMultipleResults(tokens, identifiers) {
        // Hide single result, show multiple result
        document.getElementById('result-box').style.display = 'none'
        document.getElementById('result-box-dual').style.display = 'block'
        document.getElementById('result-title').textContent = `Generated ${tokens.length} Tokens`
        
        const container = document.getElementById('token-pair-container')
        container.innerHTML = tokens.map((token, index) => `
            <div class="token-item">
                <label>Token ${index + 1} (${identifiers[index]}):</label>
                <textarea id="token-result-${index + 1}" readonly>${token}</textarea>
                <button class="copy-token-btn" data-token="${index + 1}">Copy Token ${index + 1}</button>
            </div>
        `).join('')
        
        document.getElementById('result-container').style.display = 'block'
        document.getElementById('result-container').scrollIntoView({ behavior: 'smooth' })
    }
})
