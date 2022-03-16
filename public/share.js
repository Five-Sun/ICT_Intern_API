Kakao.init('46fb8967b79616210acc50d982ee0ba8');
console.log(Kakao.isInitialized());

//카카오 API 설정

function kakaoShare(shareImage, shareTitle, shareDes, shareUrl) {

    Kakao.Link.sendDefault({
        objectType: 'feed',
        content: {
            title: shareTitle,
            description: shareDes,
            imageUrl: shareImage,
            link: {
                webUrl: shareUrl
            },
        },
        buttons: [
            {
                title: '책 정보 보기',
                link: {
                   webUrl: shareUrl
                },
            },
        ]
    });
}; //카카오톡 공유하기 API 내용에 맞게 매개변수로 해당 정보의 객체를 받아 내용물로 지정
