---
title:  "‘Jekyll theme’을 이용해 github.io 블로그 제작하기"
excerpt: "개발자들은 모두 하나씩은 갖고 있다는 github.io 블로그를 시작해봤습니다."
header:
  image: https://clamwell.github.io//assets/images/post01/blog-cover-cw.jpg
categories:
  - Blog
tags:
  - Blog
  - Jekyll
  - Github
last_modified_at: 2020-04-27T08:06:00-05:00

toc: true
toc_sticky: true # 스크롤 내릴때 같이 내려가는 목차

---

### github.io 블로그
구글 서핑을 하다보면 심심찮게 보이던 도메인이 있었습니다.
특히 개발과 관련한 포스팅을 찾다보면 자주 보이는 도메인이었죠.

>blahblah.github.io

나중에 알고보니 이러한 도메인을 소유한 블로그들은 GitHub Pages가 제공하는 무료 호스팅 서비스를 통해 운영되는 블로그들이었습니다. 
개발자들은 모두 하나씩은 갖고 있다는 github.io 블로그, 한번 시작해봤습니다.


### 블로그 빌드업 서비스 jekyll
대부분의 github.io 블로그들은 GitHub Pages 서비스를 통해 호스팅되고, 정적 웹사이트의 빌드업을 돕는 **Jekyll** 로 제작됩니다. jekyll은 정적 웹사이트 생성기(Static Website generator:SWG)의 하나로 Ruby로 쓰여진 오픈소스입니다. 요즘 많이 쓰는 표현으로 개인 블로그 솔루션이라고도 할 수 있을 것 같습니다.

### jekyll 의 장점

#### 1. DB가 필요없다
jekyll를 사용하면 따로 DB를 파고, DB의 내용을 가져와 뿌려주는 개발을 하지 않고도 그럴싸한 블로그를 제작 할 수 있습니다. 원하는 포스팅 내용을 마크다운 문서로 작성해 약속된 디렉토리안에 위치시켜놓으면 jekyll이 이를 감지하여 HTML 페이지를 자동 생성 해줍니다. 이러한 방식으로 jekyll은 개인이 작성한 md 문서 등 리소스를 토대로 블로그의 화면, 페이지들을 만들어줍니다. 우리는 jekyll에 의해 생성된 페이지들을 서버에 정적으로 호스팅하기만 하면 됩니다. jekyll의 이러한 메카니즘은 SEO 측면에서 유리할 것 같다는 생각이 듭니다 :)

![이미지](https://clamwell.github.io//assets/images/post01/img02.JPG "md문서")
<span class="sm">마크다운(markdwon) 문서</span>


#### 2. 테마를 제공한다
jekyll이 제공하는 아름다운 서비스가 또 있습니다. 바로 jekyll theme입니다. 내 인생의 컬러는 `#000` 밖에 없다하는 개발자분들도 전세계 능력자들이 미리 디자인 해놓은 수 많은 테마 중 하나를 선택해 가져와 자유롭게 사용할 수 있습니다. 저도 이왕이면 jekyll이 제공하는 서비스를 모두 활용해보자는 마음으로 Jekyll의 테마 중 가장 보편적으로 사용된다고 할 수 있는 minimal-mistakes를 선택했습니다.

기본적인 HTML, CSS에 대한 이해가 있는 분들은 테마를 가져와 골격을 갖춘 후 소소하게 커스터마이징을 할 수도 있습니다. 이 블로그 또한 minimal-mistakes의 기본 CSS 위에 custom CSS를 추가하여 폰트사이즈와 컬러를 입맛에 맞게 변경했습니다.(저는 폰트가 더 작은 것을 선호하기에...🤭)

* [Jekyll Theme 목록](http://jekyllthemes.org/)
* [minimal-mistakes 깃헙](https://github.com/mmistakes/minimal-mistakes)



### 과정
구글에 jekyll github blog 를 검색해보면 친절하고 상세하게 소개된 튜토리얼이 많습니다.
Jekyll을 통해 블로그를 생성하는 과정은 간략하게 다음과 같습니다.

1. github.io 블로그 소스를 담을 repository 생성
2. 로컬에 클론 저장소 생성
3. 클론 저장소 디렉토리로 이동한 후, ruby 실행한 후 jekyll 설치
4. jekyll blog가 제대로 설치되었는지 로컬 서버에서 확인
5. jekyll theme 가져와 덮기
6. `_config.yml`를 수정해 블로그의 설정 변경
7. 테스트용 post 작성

![jekyll server 실행](https://clamwell.github.io//assets/images/post01/img03.jpg "jekyll server 실행")
<span class="sm">jekyll server를 실행해 로컬(localhost:4000)에서 블로그가 정상적으로 작동하는지 확인이 가능하다.</span>

![yml문서](https://clamwell.github.io//assets/images/post01/img01.JPG "yml문서")
<span class="sm">jekyll theme 에서 제공하는 yml문서를 열어 원하는 설정값으로 변경해준다.</span>


### ABOUT 페이지 추가
루트 디렉토리 아래 `_pages`에 기본 블로그 포스팅 외에 별도의 HTML 페이지들을 담아 둘 수 있습니다. minimal-stakes 테마는 몇가지 샘플 페이지(`/docs/_pages`참고)들을 제공하기도 합니다. 저는 본인을 소개하는 어바웃 페이지를 별도로 퍼블리싱 해준 후 상단 네비게이션에 해당하는 navigation.yml에서 항목을 추가해줬습니다.


### 완성

![블로그완성](https://clamwell.github.io//assets/images/post01/img04.jpg "블로그완성")

완성된 모습입니다!
이제 여기에 포트폴리오 페이지만 추가하면 완벽해질 것 같습니다.🥰
