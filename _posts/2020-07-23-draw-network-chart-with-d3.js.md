---
title:  "d3.js로 network chart(graph) 그려보기"
excerpt: "javascript 라이브러리 d3.js 를 이용해 interactive network graph를 그려봤다."
header:
  image: https://clamwell.github.io//assets/images/post02/post-cover.jpg
categories:
  - Blog
tags:
  - Blog
  - Jekyll
  - Github
  - d3.js
  - networkGraph
  - JavaScript
last_modified_at: 2020-07-23T08:06:00-05:00

toc: true
toc_sticky: true # 스크롤 내릴때 같이 내려가는 목차
---

## 💻 d3.js로 network chart(graph) 그려보기
최근 업무 중에 SVG로 네트워크 그래프를 테스트 삼아 그려볼 일이 있었다. 구현방식으로 javascript 라이브러리 d3.js의 `d3.forceSimulation()`를 활용했으며, 웹에 공개되어 있는 코드를 참고하였다. 구글에 검색해보니 아직 한국어로 된 가이드는 많지 않은 것 같아 작업 내역을 일부 정리해봤다.

네트워크 그래프는 타 언론사에서도 자주 활용하는 시각화 모델이다. 주로 다양하게 얽힌 인물 간의 관계도를 시각화할 때 사용되곤 한다.

* [SBS - 신종 코로나 감염자 현황](http://mabu.newscloud.sbs.co.kr/202002corona/web/index.html)
* [KBS - 한 눈에 보는 얽히고 설킨 MB 혐의](http://dj.kbs.co.kr/resources/2018-03-15/)

![SBS마부작침의 코로나 감염 경로 네트워크 그래프](https://clamwell.github.io/assets/images/post02/img03.jpg "SBS마부작침의 코로나 감염 경로 네트워크 그래프")
<span class="sm img-caption">SBS마부작침의 코로나 감염 경로 네트워크 그래프</span>


이처럼 요소 간의 연결고리·관계도·연관관계를 시각화할 때 유용한 네트워크 그래프,
d3.js를 이용해 간단하게 그려보는 방법을 알아보자!

--------------------------

#### 📌 준비
d3.js 라이브러리를 사용하기 위해 소스를 CDN을 이용해 외부에서 가져온다.  
이번 테스트에서는 v5 버전을 사용했다.
```javascript
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/d3/5.16.0/d3.min.js"></script>
```

HTML 내부 그래프가 위치할 곳에 SVG를 하나 생성해줬다.
```javascript
<div class="netwrok-graph">
    <svg id="NETWORK_GRAPH">
        <!--이곳에 그래프를 그려준다-->
    </svg>
</div>
```


생성함수가 호출되면, 네트워크 차트를 그려주기 위해 객체 내부에서 코드를 작성한다.
미리 생성해둔 SVG 내부에 `g` 노드를 하나 더 만들어줬다.
```javascript   
var networkGraph = {
    createGraph : function(){
        var width = 500;
        var height = 500;
        var svg = d3.select("#NETWORK_GRAPH")
                    .attr("viewBox", [0, 0, width, height]);
        var gHolder = svg.append("g")
                            .attr("class", "g-holder");

        var links; //링크객체
        var nodes; //노드객체
    })
}

networkGraph.createGraph(); // init 함수 안에서 호출
```


#### 📌 d3.forceSimulation()
d3.js에서 네트워크 그래프를 그리기 위해서는 `d3.forceSimulation()`를 활용해야 한다.    `d3.forceSimulation()`은 이름에서 알 수 있듯 요소간의 중력, 장력 작용을 구현해주는 메소드다.  

네트워크 그래프를 그릴 때 사용되는 `d3.forceSimulation()`의 메소드 체이닝 구조를 먼저 살펴봤다.

> Medium에 게재된 force simulations 관련글을 번역, 참조하였다.  
> [Getting started with D3.js force simulations](https://medium.com/@bryony_17728/d3-js-two-v-4-network-charts-compared-8d3c66b0499c)


`d3.forceSimulation()`의 기본 코드 구조는 다음처럼, 사용을 선언한 이후.force()의 인자로 다양한 설정 값들을 전달해주는 방식으로 이뤄진다.
```javascript
var simulation = d3.forceSimulation()
          .force("center", d3.forceCenter(width / 2, height / 2))
          .force("link", d3.forceLink(links).id( function(d){ return d.id }))
          .force("charge", d3.forceManyBody().strength(-100))
```
* 다음의 중력, 장력 작용을 부여할 것이다.
* center — 요소들을 가운데 위치로 잡아 당겨라. 잡아당기는 힘이 작용하는 지점을 인자로 전달해줄 수 있다.
* charge — 요소들이 서로 겹치지 않도록 띄어라(repel). 멀어지는 정도를 `.strength()`에 넘버값으로 전달한다. 기본 default 값은 `30`이다.
* link — links 객체의 값을 바탕으로 요소간의 링크를 연결해줄 것이다. 연결기준은 `.id()` 메소드의 인자로 전달한다.

#### 📌 Data
네트워크 그래프를 그릴 때 참조하는 데이터는 크게 두가지 유형으로 나뉜다.

첫번째는 **nodes**, 두번째는 **links** 이다.  
 **nodes** 는 요소에 대한 정보 값, **links** 는 연결에 대한 정보 값을 담고 있다.

![네트워크 그래프의 데이터 구조](https://clamwell.github.io/assets/images/post02/img01.jpg "네트워크 그래프의 데이터 구조")
<span class="sm img-caption">네트워크 그래프의 데이터 구조</span>

두개의 데이터는 다음과 같이 배열의 형태로 준비해준다.  
```javascript
nodes = [{"id": "청소년", "value": 3,"group": "person"},{"id": "장면","value": 3, "group": "media"},{"id": "드라마", "value": 3,"group": "media"}]
links = [{"source": "청소년","target": "장면","value": 2},{"source": "청소년","target": "비행","value": 8},{ "source": "청소년", "target": "티비", "value": 4}]
```

* nodes — nodes 데이터 배열의 각 요소들은 객체 형태를 취하고, 각 node 객체들은 꼭 중복되지 않는 유니크한 id 값을 갖고 있어야 한다.
* links — links 데이터 배열의 각 요소들도 객체 형태이며, 각 link 객체들은 line의 시작점을 가리키는 source와 끝지점을 가리키는 target의 값으로 유효한 id 값을 갖고 있어야 한다. source의 값이 'a'고, target의 값이 'b'인 link 객체는 'a'와 'b'를 연결하는 path가 된다.

🔔 이때 nodes, links 객체들에는 `value`나 `group`처럼 원하는 속성 변수들을 자유롭게 추가해 줄 수 있다!

#### 📌 d3.코드 작성하기
이제 코드를 작성하기 위한 준비를 마치었다. 실제로 d3.js 코드를 작성해서 그래프를 그려본다.

#### ① 데이터준비
```javascript
const NETWORK_DATA = {
    links: [{}, {}, {}....],
    nodes: [{}, {}, {}....]
}

var links = NETWORK_DATA.links.map(function(d){
                return Object.create(d)
            });
var nodes = NETWORK_DATA.nodes.map(function(d){
                return Object.create(d)
            });

```
하나의 객체로 머징되어 있던 데이터 객체를 각각 나누어서 `links`, `nodes`의 변수에 할당해줬다.


#### ② force simulation 선언
위에서 살펴봤던 `d3.forceSimulation`을 선언해준다.

```javascript
var simulation = d3.forceSimulation(nodes)
          .force("link", d3.forceLink(links).id( function(d){ return d.id }))
          .force("charge", d3.forceManyBody().strength(-100))
          .force("center", d3.forceCenter(width / 2, height / 2))
          .force("collide",d3.forceCollide().radius( function(d){ return d.value*8}) );
```
데이터가 담긴 `links`, `nodes`의 변수가 `d3.forceSimulation`의 인자로 전달되었다.   
`collide` 속성을 통해 구체적으로 각 요소들 간의 간격을 명시해줬다. 이제 요소들 간 충돌이 발생하거나, 요소들이 겹치더라도 다시 명시 된 간격만큼 강제로 떨어지게 된다. 만약 d3.forceCollide().radius()의 리턴 값으로 더 큰 값을 넘겨주게 되면 nodes 요소들은 서로 아주 멀리 떨어지게 된다.

#### ③ circle 노드와 line 노드 생성
d3.js를 이용해 circle 노드와 line 노드를 생성해준다.
```javascript
var link = gHolder.append("g")
                .attr("stroke", "#999")
                .attr("stroke-opacity", 0.6)
            .selectAll("line")
                .data(links)
                .join("line")
                .attr("stroke-width", function(d){ return Math.sqrt(d.value*5)} );

var node = gHolder.append("g")
                .attr("class", "circle-node-holder")
            .selectAll("g")
                .data(nodes)
                .enter()
                .append("g")
                .each(function(d){
                    d3.select(this)
                        .append("circle")
                        .attr("r", d.value*5)
                        .attr("fill", fillCircle(d.group));
                    d3.select(this)
                        .append("text").text(d.id)
                        .attr("dy",6)
                        .style("text-anchor","middle")
                        .attr("class", "node-label")
                    }).call(networkGraph.drag(simulation));                   
```

**link**

✔ line의 두께는 각 데이터 value 변수의 값에 비례하게 했다. 이번 테스트의 경우 value가 각 형태소간의 연관관계 정도를 가리킨다. 이를 통해 선이 두꺼울 수록 두 요소간의 연관관계가 높다는 것을 보여준다.

**node**

✔ circle 의 radius 값은 마찬가지로 데이터 value 변수의 값에 비례하게 했다. 여기서 nodes 의 value 값은 문서 내에서 해당 형태소의 출현빈도이다. 즉 원의 크기가 클수록 자주 등장한 형태소를 가리킨다.  

✔ circle 의 컬러 값은 따로 정의해둔 함수를 통해 칠해주었다. 각 형태소 별 미리 지정해준 그룹에 따라 색을 달리 했다.
```javascript
var fillCircle = function(g){
    if(g == "bad"){
        return "#ff3c00";
    }else if(g=="act"){
        return "#386cff";
    }else if(g=="media"){
        return "#6fbc5b";
    }else{
        return "#555";
    }
};
```
✔ 또한 바로 circle 노드를 append 하지 않고 다시 한번 요소의 개수만큼 g 노드를 만들어 그 안에서 각각 circle 노드를 append 하는 방식을 선택했다. 이는 circle 노드와 함께 text 노드도 추가해주어 각 요소에 데이터 라벨링을 해주기 위해서다. circle 노드 안에는 text 노드 append가 불가능하기 때문!

✔ 마지막으로 circle 요소에 콜백 함수로 따로 정의해둔 drag 함수를 바인딩해줬다. 각 요소들을 사용자가 자유자재로 드래그 조작 할 수 있게 해주기 위함이다. 이때 drag 함수 내부에는 d3에서 제공하는 `.drag()` 메소드가 선언되어 있다.

#### ④ tick functionality

```javascript
simulation.on("tick", function(){
    link.attr("x1", function(d){ return d.source.x; })
        .attr("y1", function(d){ return d.source.y; })
        .attr("x2", function(d){ return d.target.x; })
        .attr("y2", function(d){ return d.target.y; });
    node.attr("transform", function(d) { return "translate("+d.x+","+ d.y+")"; });
});
```
마지막으로 엔진이 실시간으로 link 와 node 객체의 위치를 체크하고, 변동이 발생하면 새로운 위치를 잡아주도록(redraw) tick 기능을 추가한다.

#### ⑤ 스타일 추가
```css
#NETWORK_GRAPH .node-label { font-size: 14px; font-weight:bold; color:#111; stroke: white;stroke-width: 1.5px;paint-order: stroke fill; text-anchor: middle;}
```
circle 노드 위에 올라가는 텍스트 라벨이 잘 보이도록 css에서 스타일을 추가해준다.

------------------------------

#### 📌 완성
![네트워크 그래프 완성된 모습](https://clamwell.github.io/assets/images/post02/img02.jpg "네트워크 그래프 완성된 모습")
<span class="sm img-caption">네트워크 그래프 완성된 모습</span>
* [그래프 보러가기](https://clamwell.github.io/preview/d3-network-graph/)

사용자가 조작할 수 있고(drag) 요소간의 관계를 한눈에 그려주는 네트워크 그래프가 완성되었다.  
모바일에서도 터치-드래그로 조작이 가능하다.


사실 이 포스트를 쓰면서도 `d3.forceSimulation`의 다양한 기능과 인자값들에 대해서 완벽하게 이해하지는 못했다. d3.js 도큐먼트를 일독해야 완벽한 이해가 가능하지 않을까....예제들마다 코드를 조금씩 다르게 작성한 부분들도 많아서, 여러가지 예제들을 짬뽕으로 참고하다보면 코드가 꼬이기 일쑤다.

예를 들어 어떤 예제에서는 `d3.forceSimulation`을 정의하면서 동시에 nodes 객체를 인자로 넘겨주면서 데이터와 `simulation` 객체를 바인딩을 해주었다면,

```javascript
var simulation = d3.forceSimulation(nodes).~~~
```

어떤 예제에서는 `d3.forceSimulation`을 정의할때 데이터를 넘겨주지 않고, 나중에 따로  `simulation`와 데이터를 바인딩 해주는 방식으로 코드를 작성했다.

```javascript
var simulation = d3.forceSimulation().~~~
simulation.nodes(nodes)
simulation.force("link").links(links)
```

어떤 코드를 쓰든 메소드 구현의 차이겠지만, 공개된 코드들에 친절한 설명이 없을 경우에는 맨땅에 헤딩을 하며 하나씩 시도해보는 수 밖에 없다...😭 고로 똑같이 헤딩을 하고있을 다른 분들을 위해 소소하게 작업 내역을 공개해둔다.

또 `d3.forceSimulation`의 설정값들에 따라 그래프가 어떻게 변화하는지 실시간으로 확인해볼 수 있는 좋은 시뮬레이션 페이지가 있어 남겨둔다.
* [d3-force testing ground](https://bl.ocks.org/steveharoz/8c3e2524079a8c440df60c1ab72b5d03)
