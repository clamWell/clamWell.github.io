---
title:  "‘Jekyll theme’을 이용해 블로그를 시작해봤습니다"
excerpt: "이 블로그를 소개하는 첫번째 게시글입니다."

categories:
  - Blog
tags:
  - Blog
last_modified_at: 2020-04-27T08:06:00-05:00
---

#### github.io 블로그
구글 서핑을 하다보면 심심찮게 발견하는 도메인이 있습니다.
특히 개발과 관련한 포스팅을 찾다보면 자주 보이는 도메인이었죠.

`블라블라.github.io`

이러한 도메인을 소유한 블로그들은 GitHub Pages가 제공하는 무료 호스팅 서비스를 통해 생성된 블로그들입니다. 자고로 개발자라면 모두 하나씩은 갖고 있다는 **github.io 블로그**.
물론 전문 개발자는 아니지만 한번 시작해봤습니다.😉

*********************************

#### 블로그 빌드업 서비스 Jekyll
호스팅은 GitHub Pages 서비스를 이용하고, 블로그는 정적 웹사이트 빌드업을 돕는 Jekyll을 활용해 제작했습니다. jekyll은 정적 웹사이트 생성기(Static Website generator:SWG)의 하나로 Ruby로 쓰여진 오픈소스입니다.

#### Jekyll 의 장점
**DB가 필요없다**
jekyll를 사용하면 따로 DB를 파고, DB의 내용을 가져와 뿌려주는 서버 개발을 하지않고도 그럴싸한 블로그를 제작, 운영 할 수 있습니다. 원하는 포스팅 내용을 약속된 문법을 통해 md(markdown)문서로 작성해 디렉토리안에 위치시켜놓으면 jekyll이 이를 감지하여 HTMl 페이지로 자동생성 해주기 때문입니다.
마크다운 문서를 생성하는 것으로 블로그 포스팅을 추가하면 jekyll이 이를 html문서로 변환하여 블로그의 화면, 페이지들을 미리 만들어둡니다. 우리는 이 생성된 페이지를 서버에 정적으로 호스팅하기만 하면 됩니다.

![이미지](https://clamwell.github.io//assets/images/post01/img02.JPG "md문서")

**테마를 제공한다**
또 jekyll이 제공하는 아름다운 서비스 중 하나가 jekyll theme입니다. 디자인을 두려워하는, 내 인생의 컬러는 `#000` 밖에 없다하는 개발자분들도 전세계 능력자들이 미리 구축해놓은 아름다운 jekyll theme 중 하나를 선택해 가져와 사용할 수 있습니다. 제로베이스에서 하드코딩으로 블로그를 디자인 할 수도 있었지만 이왕이면 jekyll 이 제공하는 서비스를 사용해보자는 마음으로 Jekyll 의 테마 중 가장 기본적이고, 보편적으로 사용된다고 할 수 있는 minimal-mistakes를 적용했습니다.

[Jekyll Theme 목록](http://jekyllthemes.org/)
[minimal-mistakes 깃헙](https://github.com/mmistakes/minimal-mistakes)

기본적인 HTML, CSS에 대한 이해가 있는 분들은 테마를 가져와 골격을 갖춘 후 소소하게 커스터마이징을 할 수도 있습니다. 이 블로그 또한 minimal-mistakes의 기본 CSS 위에 custom CSS를 추가하여 폰트사이즈와 컬러를 입맛에 맞게 변경했습니다.(저는 작은 글씨 크기가 좋았기에...🤭)

#### 과정
1. githubio 블로그 소스를 담을 repository 생성
2. 로컬에 클론 저장소 생성
3. 클론 저장소 디렉토리로 이동, ruby 실행한 후 jekyll 설치
4. 기본 jekyll blog의 골격이 갖추어졌다면 jekyll theme 가져와 덮어쓰기
5. `_config.yml`를 수정해 블로그의 설정 변경
6. 테스트용 post 작성

![yml문서](https://clamwell.github.io//assets/images/post01/img01.JPG "yml문서")

#### ABOUT 페이지 추가
루트 디렉토리 아래 `_pages`에 기본 블로그 포스팅 외에 별도의 HTML 페이지들을 담아 둘 수 있습니다. ABOUT 페이지를 따로 퍼블리싱한 후 navation.yml에서 링크를 추가해줬습니다.

#### 완성
