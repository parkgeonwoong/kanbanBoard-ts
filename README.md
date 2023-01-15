# 칸반보드 - 투드리스트

|        스택         |     설명     |
| :-----------------: | :----------: |
|     TypeScript      | 타입스크립트 |
|       Recoil        |  상태 관리   |
|  Styled-components  | 스타일 관리  |
| react-beautiful-dnd | 드래그앤드롭 |
|   react-hook-form   |   폼 관리    |

<br>

## 목적

- 저번에 TodoList 토이 프로젝트 만들고 나서, 이번에는 칸반보드를 만들어보고 싶었다.
- TodoList version 2.0

<br>

## 이슈

- 설계를 할 때 쉽게 구현하기 위해 배열로만 atom을 관리했는데, 카테고리별 구현을 위해 `객체로 변경`하면서 `타입과 알고리즘`이 많이 바뀌었다.
- 드랍 이벤트 발생 시 모든 State가 재렌더링하면서 속도와 렌더링 문제가 있었다.
- 날씨 구현을 라이브러리가 아니라 window API로 직접 구현하고 싶었으며, 한 컴포넌트에 한가지 기능만 담고 싶어서 리펙토링 하였다.

<br>

## 성능 개선

|                          Before                          |                          After                           |
| :------------------------------------------------------: | :------------------------------------------------------: |
|                          11.6ms                          |                          6.9ms                           |
| <img src="images/issue1.png" width="300" height="180" /> | <img src="images/issue2.png" width="300" height="180" /> |
| <img src="images/issue3.png" width="300" height="180" /> | <img src="images/issue4.png" width="300" height="180" /> |
