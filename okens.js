var cont = 1;
var jidoukana = "jidoujanai";
// 最初の言語を日本語に設定
var currentLanguage = 'ja-JP';
        // 音量スライダーと入力フィールドの要素を取得
        const volumeControl = document.getElementById("volumeControl");
        const volumeInput = document.getElementById("volumeInput");
        const volumeDisplay = document.getElementById("Display");

        // 音量スライダーの値が変わったとき
        volumeControl.addEventListener("input", function() {
            const volume = volumeControl.value; // 音量（0〜100）を取得
            volumeInput.value = volume; // スライダーの値を入力フィールドに反映
            volumeDisplay.textContent = "現在の音量: " + volume; // 音量表示の更新
        });

        // 音量入力フィールドの値が変わったとき
        volumeInput.addEventListener("input", function() {
            let inputValue = volumeInput.value; // 入力値を取得（空の時も考慮）

            // 入力が空の場合（""）、音量を0に設定
            if (inputValue == "") {
                volumeControl.value = 0; // スライダーも0に設定
                volumeDisplay.textContent = "現在の音量: 0"; // 音量表示を更新
            } else {
                // 入力が0未満の場合、0に設定
                if (inputValue < 0) {
                    volumeInput.value = 0; // 0未満の値が入力された場合、0に戻す
                    volumeControl.value = 0; // スライダーも0に設定
                    volumeDisplay.textContent = "現在の音量: 0"; // 音量表示を更新
                } 
                // 入力が100以上の場合、100に設定
                else if (inputValue >= 100) {
                    volumeInput.value = 100; // 100以上の値が入力された場合、100に修正
                    volumeControl.value = 100; // スライダーも100に設定
                    volumeDisplay.textContent = "現在の音量: 100"; // 音量表示を更新
                } else {
                    // 入力された値でスライダーと音量表示を更新
                    volumeControl.value = inputValue; 
                    volumeDisplay.textContent = "現在の音量: " + inputValue; // 音量表示を更新
                }
            }
        });


// ページをリロードする前に確認を取る関数
function confirmReload() {
    // 確認ダイアログを表示
    var confirmation = confirm("本当にリセットしてもよいですか？");

    // ユーザーがOKを押した場合のみリロード
    if (confirmation) {
        speechSynthesis.cancel();  // 読み上げ中の音声を停止
        location.reload(); // ページを再読み込み
    } else {
        console.log("リセットがキャンセルされました");
    }
}

// 言語切り替えボタンをクリックしたときに言語を切り替える
function toggleLanguagejp() {
    if (jidoukana === 'jidou') {
    jidoukana = 'jidoujanai';
    }
    currentLanguage = 'ja-JP'; // 日本語に切り替え
    document.getElementById('languageDisplay').textContent = "現在の言語: 日本語";
}

function toggleLanguageus() {
    if (jidoukana === 'jidou') {
    jidoukana = 'jidoujanai';
    }
    currentLanguage = 'en-US'; // 英語に切り替え
    document.getElementById('languageDisplay').textContent = "現在の言語: 英語";
}

function autoLanguage() {
    jidoukana = 'jidou';
    document.getElementById('languageDisplay').textContent = "現在の言語: 自動切り替え";
}

// テキスト内容に基づいて言語を自動判定
function autoLanguages() {
    var text = document.getElementById('textInput').value;
    // 自動切り替えが有効な場合
    if (jidoukana === 'jidou') {
        // 日本語の文字（ひらがな、カタカナ、漢字）が含まれている場合は日本語
        if (/[ぁ-んァ-ン一-龯]/.test(text)) {
            currentLanguage = 'ja-JP';  // 日本語
        } else {
            // それ以外は英語と仮定
            currentLanguage = 'en-US';  // 英語
        }
    }
}

// 読み上げボタンをクリックしたときにテキストを読み上げる
function speakText() {
    // テキストボックスからテキストを取得
    var text = document.getElementById('textInput').value;

    // 自動的に言語判定を実行（必要なら自動切り替えを行う）
    autoLanguages();

    if (text.trim() === "") {
        alert("テキストを入力してください！");
        return;
    }

    console.log("”"+text+"”と読み上げします 読み上げ"+cont+"回目");
    cont++;

    // 読み上げ設定
    var speech = new SpeechSynthesisUtterance(text);
    speech.lang = currentLanguage; // 現在選択されている言語で読み上げ

                // 音量をスライダーの値で設定
                speech.volume = volumeControl.value / 100;  // 0〜100を0〜1に変換
    // 音声読み上げが終了したときの処理
    speech.onend = function() {
        console.log('読み上げが完了しました');
        alert('読み上げが完了しました！');
    };

    // 音声を読み上げる
    window.speechSynthesis.speak(speech);
}
