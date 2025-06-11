// script.js
// DOMContentLoaded 이벤트는 HTML 문서가 완전히 로드되고 파싱되었을 때 발생합니다.
// 이 시점에 스크립트를 실행하여 요소에 접근할 수 있도록 합니다.
document.addEventListener('DOMContentLoaded', function() {
    // marked.js 라이브러리가 전역 범위에 로드되었는지 확인합니다.
    // 이는 <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
    // 이 제대로 작동했는지 검증하는 단계입니다.
    if (typeof marked === 'undefined') {
        console.error('marked.js 라이브러리가 로드되지 않았습니다. 인터넷 연결 또는 CDN 경로를 확인하세요.');
        // 라이브러리가 로드되지 않았을 경우 사용자에게 오류 메시지를 표시합니다.
        document.getElementById('content').innerHTML = '<p style="color: red;">웹페이지를 표시할 수 없습니다. 관리자에게 문의하세요.</p>';
        return; // 더 이상 진행하지 않고 함수를 종료합니다.
    }

    // `fetch` API를 사용하여 깃허브 저장소에 있는 'links.md' 파일을 비동기적으로 가져옵니다.
    fetch('links.md')
        .then(response => {
            // HTTP 응답이 성공적(200 OK)인지 확인합니다.
            if (!response.ok) {
                // 응답이 성공적이지 않다면 오류를 발생시켜 .catch 블록으로 넘깁니다.
                throw new Error(`HTTP 오류! 상태: ${response.status}`);
            }
            // 응답 본문을 텍스트 형태로 읽어 반환합니다.
            return response.text();
        })
        .then(markdownText => {
            // marked.js의 `parse` 함수를 사용하여 마크다운 텍스트를 HTML 문자열로 변환합니다.
            const htmlContent = marked.parse(markdownText);
            // 변환된 HTML 문자열을 `index.html`의 'content' ID를 가진 요소의 내부에 삽입합니다.
            document.getElementById('content').innerHTML = htmlContent;
        })
        .catch(error => {
            // 파일을 가져오거나 처리하는 과정에서 오류가 발생했을 경우 콘솔에 오류를 기록합니다.
            console.error('마크다운 파일을 로드하는 데 오류가 발생했습니다:', error);
            // 사용자에게 오류 메시지를 표시하여 문제가 발생했음을 알립니다.
            document.getElementById('content').innerHTML = '<p style="color: red;">링크와 파일을 불러오는 데 실패했습니다. 잠시 후 다시 시도해주세요.</p>';
        });
});
