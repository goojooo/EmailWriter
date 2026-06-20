console.log("Email Writer");
// function getEmailContent() {
//     const selectors = ['.h',
//         '.a3s.ail',
//         '.gmail_quote',
//         '[role="presentation"]'
//     ];
//     for (const selector of selectors) {
//         const content = document.querySelector(selector);
//         if (content) {
//             return content.innerText.trim();
//         }
//     }
//     return '';
// }
function getEmailContent() {
    // Most reliable Gmail email body selector
    const content = document.querySelector('.a3s.aiL');

    if (content) {
        return content.innerText.trim();
    }

    return '';
}

function findComposeToolbar() {
    const selectors = ['.btC', '.aDh', '[role="toolbar"]', '.gU.Up'];
    for (const selector of selectors) {
        const toolBar = document.querySelector(selector);
        if (toolBar) {
            return toolBar;
        }
    }
    return null;
}

function createAIButton() {
    const button = document.createElement('div');
    button.className = 'T-I J-J5-Ji aoO v7 T-I-atl L3';
    button.style.marginRight = '8px';
    button.innerHTML = 'AI Reply';
    button.setAttribute('role', 'button');
    button.setAttribute('data-tooltip', 'Generate AI Reply');
    return button;
}

function injectBtn() {
    const existingBtn = document.querySelector('.ai-reply-button');
    if (existingBtn) {
        existingBtn.remove();
    }
    const toolBar = findComposeToolbar();
    if (!toolBar) {
        console.log("Toolbar not found");
        return;
    }

    console.log("Toolbar found");
    const button = createAIButton();
    button.classList.add('ai-reply-button');

    button.addEventListener('click', async () => {
        try {
            button.innerHTML = 'Generating...';
            button.disabled = true;
            const emailContent = getEmailContent();
            console.log("Extracted Email:", emailContent);

            const response = await fetch('http://localhost:8090/api/email/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    emailContent: emailContent,
                    tone: "Professional"
                })
            });

            if (!response.ok) {
                throw new Error("API Request Failed")
            }

            const generatedReply = await response.text();

            const composeBox = document.querySelector(
                '[role="textbox"][g_editable="true"]'
            );
            if (composeBox) {
                composeBox.focus();
                // document.execCommand('insertText', false, generatedReply);
                composeBox.innerText = generatedReply;
            }

        } catch (error) {

        } finally {
            button.innerHTML = 'AI Reply'
            button.disabled = false
        }
    })

    toolBar.insertBefore(button, toolBar.firstChild);
}


const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
        const addedNodes = Array.from(mutation.addedNodes);
        const hasComposeElements = addedNodes.some(node =>
            node.nodeType === Node.ELEMENT_NODE &&
            (node.matches('.aDh, .btC, [role="dialog"]')
                || node.querySelector('.aDh, .btC, [role="dialog"]'))
        );

        if (hasComposeElements) {
            console.log("Compose window deected.");
            setTimeout(injectBtn, 500);
        }
    }
});

observer.observe(document.body, {
    childList: true,
    subtree: true
})