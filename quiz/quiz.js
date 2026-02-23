const quizData = [
    {
        q: "In the sentence 'Acting is a difficult profession,' what part of speech is 'Acting'?",
        h: "Can you replace the word with 'Cake' and have it make sense?",
        opts: [
            { t: "Gerund (Noun)", c: true, r: "It functions as the subject of the sentence, naming the activity rather than describing an action currently being performed." },
            { t: "Verb", c: false, r: "While it comes from a verb, it isn't showing what someone is doing in this specific sentence." },
            { t: "Adjective", c: false, r: "It isn't describing another noun; it is the noun itself." },
            { t: "Adverb", c: false, r: "It doesn't describe how an action is performed." }
        ]
    },
    {
        q: "Identify the part of speech for 'running' in: 'The boy is running to the park.'",
        h: "Is this a state of being/action happening now, or is it the name of a hobby?",
        opts: [
            { t: "Verb", c: true, r: "In this context, it describes the physical action the subject is currently performing." },
            { t: "Gerund", c: false, r: "A gerund acts as a noun, but here the word is paired with 'is' to show a continuous action." }
        ]
    },
    {
        q: "In 'He has a winning smile,' what is the word 'winning'?",
        h: "Look at the word right after it. Is 'winning' describing that word?",
        opts: [
            { t: "Adjective", c: true, r: "It describes the noun 'smile,' telling us what kind of smile it is." },
            { t: "Gerund", c: false, r: "It is describing a noun rather than acting as a noun itself." }
        ]
    },
    {
        q: "Which of these is a Gerund? 'I love swimming in the ocean.'",
        h: "Which word ends in -ing but acts like a thing you can 'love'?",
        opts: [
            { t: "Swimming", c: true, r: "It is the object of the verb 'love' and names the activity." },
            { t: "Love", c: false, r: "This is the main verb of the sentence." }
        ]
    },
    {
        q: "True or False: A Gerund always ends in '-ing' but acts as a Noun.",
        h: "Recall the 'secret agent' definition we discussed.",
        opts: [
            { t: "True", c: true, r: "By definition, a gerund is the -ing form of a verb functioning as a noun." },
            { t: "False", c: false, r: "Gerunds are specifically known for having the -ing suffix and noun-like behavior." }
        ]
    },
    {
        q: "In the sentence 'Reading helps you learn,' what is 'Reading'?",
        h: "Try the 'Yesterday' test. Does 'Reading' work as the subject?",
        opts: [
            { t: "Gerund", c: true, r: "It is the subject of the sentence, naming the activity that provides help." },
            { t: "Verb", c: false, r: "The actual verb (action) in this sentence is 'helps'." }
        ]
    },
    {
        q: "What is 'the' in the phrase 'the dancing bear'?",
        h: "Think of the 'special assistants' group.",
        opts: [
            { t: "Article", c: true, r: "It is a determiner pointing to a specific noun." },
            { t: "Verb", c: false, r: "It shows no action or state of being." }
        ]
    },
    {
        q: "In 'The barking dog kept me awake,' 'barking' is an adjective. Why?",
        h: "Think about the 'target' of the word 'barking'.",
        opts: [
            { t: "It describes the noun 'dog'.", c: true, r: "Adjectives modify nouns; here it specifies the type of dog." },
            { t: "It is an action.", c: false, r: "The main action that happened is 'kept'." }
        ]
    },
    {
        q: "Choose the gerund in this sentence: 'His hobby is gardening.'",
        h: "Which word names the specific thing he does?",
        opts: [
            { t: "Gardening", c: true, r: "It follows a linking verb and names the specific hobby/activity." },
            { t: "Hobby", c: false, r: "This is a regular noun." }
        ]
    },
    {
        q: "If 'Happiness' is a noun, what is 'Happily'?",
        h: "Think about the common suffix for 'how' words.",
        opts: [
            { t: "Adverb", c: true, r: "The -ly ending usually indicates a word that describes how an action is done." },
            { t: "Gerund", c: false, r: "It does not end in -ing." }
        ]
    }
];

let currentIndex = 0;
let userAnswers = []; // Stores {idx, selected, isCorrect}

window.onload = function() {
    initQuestion();
    initHeaderLogic();
    
    document.getElementById('back-btn').onclick = () => {
        if (currentIndex > 0) {
            currentIndex--;
            initQuestion();
        }
    };

    document.getElementById('next-btn').onclick = () => {
        if (currentIndex < quizData.length - 1) {
            currentIndex++;
            initQuestion();
        } else {
            showFinalResults();
        }
    };
};

/**
 * Implements the Share and Close logic as requested.
 */
function initHeaderLogic() {
    const headerBtns = document.querySelectorAll('.icon-btn');
    if (headerBtns.length >= 2) {
        // First icon is Share
        headerBtns[0].onclick = showShareModal;
        // Second icon is Close
        headerBtns[1].onclick = showCloseModal;
    }

    // Inject the Modal CSS if not already present
    if (!document.getElementById('modal-styles')) {
        const style = document.createElement('style');
        style.id = 'modal-styles';
        style.textContent = `
            .modal-overlay {
                position: fixed; top: 0; left: 0; width: 100%; height: 100%;
                background: rgba(0,0,0,0.8); display: flex; align-items: center;
                justify-content: center; z-index: 1000;
            }
            .modal-box {
                background: #1e1e1e; padding: 24px; border-radius: 20px;
                width: 90%; max-width: 450px; color: white; position: relative;
            }
            .modal-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
            .modal-header h2 { font-size: 1.5rem; margin: 0; }
            .modal-close { background: none; border: none; color: #888; font-size: 1.5rem; cursor: pointer; }
            
            .share-link-container {
                background: #2a2a2a; padding: 12px; border-radius: 30px;
                display: flex; align-items: center; gap: 10px; margin-bottom: 20px;
            }
            .share-url { color: #aaa; text-decoration: underline; font-size: 0.9rem; flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
            .copy-btn { background: #4a90e2; color: white; border: none; padding: 8px 16px; border-radius: 20px; cursor: pointer; font-weight: bold; }
            
            .social-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; text-align: center; }
            .social-item { display: flex; flex-direction: column; align-items: center; gap: 5px; cursor: pointer; color: #aaa; font-size: 0.8rem; }
            .social-icon { width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; }
            .icon-li { background: #0077b5; } .icon-fb { background: #1877f2; } .icon-x { background: #000000; border: 1px solid #333; } .icon-rd { background: #ff4500; }
            
            .confirm-btns { display: flex; gap: 12px; margin-top: 20px; }
            .btn-yes { background: #c62828; color: white; border: none; padding: 12px; border-radius: 8px; flex: 1; cursor: pointer; font-weight: bold; }
            .btn-no { background: #333; color: white; border: none; padding: 12px; border-radius: 8px; flex: 1; cursor: pointer; font-weight: bold; }
        `;
        document.head.appendChild(style);
    }
}

function showShareModal() {
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.innerHTML = `
        <div class="modal-box">
            <div class="modal-header">
                <h2>Shareable public link</h2>
                <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">✕</button>
            </div>
            <div class="share-link-container">
                <span class="share-url">gemini.google.com/share/6ca7629bdc7</span>
                <button class="copy-btn" onclick="copyMockLink(this)">Copy link</button>
            </div>
            <p style="color: #888; font-size: 0.8rem; margin-bottom: 20px;">
                ⓘ Public links can be reshared. Share responsibly, delete at any time.
            </p>
            <div class="social-grid">
                <div class="social-item"><div class="social-icon icon-li">in</div><span>LinkedIn</span></div>
                <div class="social-item"><div class="social-icon icon-fb">f</div><span>Facebook</span></div>
                <div class="social-item"><div class="social-icon icon-x">𝕏</div><span>X</span></div>
                <div class="social-item"><div class="social-icon icon-rd">〄</div><span>Reddit</span></div>
            </div>
        </div>
    `;
    document.body.appendChild(overlay);
}

window.copyMockLink = function(btn) {
    const url = "gemini.google.com/share/6ca7629bdc7";
    const tempInput = document.createElement("input");
    tempInput.value = url;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
    
    btn.innerText = "Copied!";
    btn.style.background = "#2e7d32";
    setTimeout(() => {
        btn.innerText = "Copy link";
        btn.style.background = "#4a90e2";
    }, 2000);
}

function showCloseModal() {
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.innerHTML = `
        <div class="modal-box">
            <div class="modal-header">
                <h2>Exit Quiz</h2>
                <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">✕</button>
            </div>
            <p>Do you really want to close the quiz?</p>
            <div class="confirm-btns">
                <button class="btn-yes" onclick="window.close(); this.closest('.modal-overlay').remove();">Yes</button>
                <button class="btn-no" onclick="this.closest('.modal-overlay').remove()">No</button>
            </div>
        </div>
    `;
    document.body.appendChild(overlay);
}

function initQuestion() {
    const qCounter = document.getElementById('q-counter');
    const qText = document.getElementById('q-text');
    const qHint = document.getElementById('q-hint');
    const optionsList = document.getElementById('options-list');
    const feedbackPanel = document.getElementById('feedback-panel');
    const backBtn = document.getElementById('back-btn');
    const nextBtn = document.getElementById('next-btn');

    const data = quizData[currentIndex];
    
    // Update counter
    qCounter.innerText = `Answered: ${userAnswers.length}/${quizData.length}`;
    
    qText.innerText = data.q;
    qHint.innerText = `Hint: ${data.h}`;
    
    optionsList.innerHTML = '';
    feedbackPanel.classList.add('hidden');
    
    nextBtn.classList.remove('hidden');
    
    if (currentIndex > 0) {
        backBtn.classList.remove('hidden');
    } else {
        backBtn.classList.add('hidden');
    }

    const previousAnswer = userAnswers.find(a => a.idx === currentIndex);

    data.opts.forEach((opt, i) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.innerText = opt.t;
        
        if (previousAnswer) {
            btn.disabled = true;
            if (i === previousAnswer.selected) {
                btn.classList.add(opt.c ? 'correct' : 'wrong');
                showFeedback(opt.r);
            } else if (opt.c) {
                btn.classList.add('correct');
            }
        } else {
            btn.onclick = () => selectOption(i);
        }
        
        optionsList.appendChild(btn);
    });
}

function selectOption(optIndex) {
    const data = quizData[currentIndex];
    const selectedOpt = data.opts[optIndex];
    
    if (!userAnswers.find(a => a.idx === currentIndex)) {
        userAnswers.push({
            idx: currentIndex,
            selected: optIndex,
            isCorrect: selectedOpt.c
        });
    }

    const btns = document.getElementById('options-list').querySelectorAll('.option-btn');
    btns.forEach((btn, i) => {
        btn.disabled = true;
        if (i === optIndex) {
            btn.classList.add(selectedOpt.c ? 'correct' : 'wrong');
        } else if (data.opts[i].c) {
            btn.classList.add('correct');
        }
    });

    document.getElementById('q-counter').innerText = `Answered: ${userAnswers.length}/${quizData.length}`;
    showFeedback(selectedOpt.r);
}

function showFeedback(text) {
    const panel = document.getElementById('feedback-panel');
    const rationale = document.getElementById('rationale-text');
    rationale.innerText = text;
    panel.classList.remove('hidden');
}

function showFinalResults() {
    document.getElementById('quiz-view').classList.add('hidden');
    document.getElementById('results-view').classList.remove('hidden');

    const answeredCount = userAnswers.length;
    const right = userAnswers.filter(a => a.isCorrect).length;
    const wrong = answeredCount - right;
    const skipped = quizData.length - answeredCount;
    const accuracy = Math.round((right / quizData.length) * 100);

    document.getElementById('final-score').innerText = `${right}/${quizData.length}`;
    document.getElementById('final-accuracy').innerText = `${accuracy}%`;
    document.getElementById('count-right').innerText = right;
    document.getElementById('count-wrong').innerText = wrong;
    
    const bRows = document.querySelectorAll('.b-row');
    bRows.forEach(row => {
        if (row.textContent.includes('Skipped')) {
            row.lastElementChild.innerText = skipped;
        }
    });
}