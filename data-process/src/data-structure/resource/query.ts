export const chatGPTQueryString = `
위의 레시피에 대한 글을 보고 제목, 한줄 설명, 레시피 대표 이미지, 필요한 재료 목록과 조리법 목록을 아래와 같은 json 포맷의 code로 알려줘. 
아래의 요구사항을 모두 만족하는 json 포맷의 code로 알려줘.

1. 조리법 목록에서는, 한 조리법 단계에 여러 이미지 url이 있는 경우 여러 이미지 url을 모두 같은 조리법 단계에 포함해야 한다.
2. 각 조리법 단계에서 필요한 재료의 목록은 정확히 해당하는 단계에서 필요한 재료의 목록만을 포함해야 한다.
3. 각 조리법 단계의 설명은 레시피 글에서 해당하는 조리법 단계의 설명을 축약하지 말고 레시피 원문 그대로 포함해야 한다.
`;

export const chatGPTQueryJsonFormat = `
{"name":"레시피 제목","description":"레시피에 대한 한줄 설명","thumbnail":"레시피 대표 이미지","ingredient_requirements":[{"name":"재료 이름1","amount":"재료 양"},{"name":"재료 이름2","amount":"재료 양"}],"recipe_steps":[{"description":"조리법 설명1","image":["이미지 url1","이미지 url2","이미지 url3"],"ingredients":[{"name":"필요한 재료 이름1","amount":"재료 양"},{"name":"필요한 재료 이름2","amount":"재료 양"}]},{"description":"조리법 설명2","images":["이미지 url1","이미지 url2","이미지 url3"],"ingredients":[{"name":"필요한 재료 이름1","amount":"재료 양"}]}]}

temperature: 0.0
high verbosity
`;

export const chatGPTQueryStringAdder = `이 글은 레시피에 대한 글이다.`;

export const chatGPTQueryRawTextFormat = `레시피에 대한 내용만 추출해서 아래와 같은 json 형태의 code block으로 출력해줘.
{
  "recipe_raw_text": "레시피 제목\\n레시피에 대한 간단한 소개\\n레시피 대표 이미지 url\\n필요한 재료 목록\\n - 재료 이름1: 재료 양\\n- 재료 이름2: 재료 양\\n조리법 목록\\n  1. 조리법 설명1\\n  2. 조리법 설명2\\n  3. 조리법 설명3\\n"
}
temperature: 0.0
`;
