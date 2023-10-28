export const chatGPTQueryString = `
이제부터 레시피에 대한 글을 제시할 거야.
레시피에 대한 글을 보고 아래의 요구사항을 모두 만족하면서, 예시로 적어둔 json 포맷으로 알려줘.

아래는 예시의 json 포맷이다.

JSON Format:
"""
{
  "name": "레시피 제목",
  "description": "레시피에 대한 설명을 절대 요약하지 말고, 레시피 원문 그대로 전부 포함한다.",
  "thumbnail": "레시피 대표 이미지 url",
  "ingredient_requirements": [
    { "name": "재료 이름1", "amount": "재료 양" },
    { "name": "재료 이름2", "amount": "재료 양" }
  ],
  "recipe_steps": [
    {
      "description": "조리법 단계에 대한 설명을 요약하거나 누락하지 않고 레시피 원문 그대로 포함해서 자세히 적는다.",
      "images": ["이미지 url1", "이미지 url2", "이미지 url3"],
      "ingredients": [
        { "name": "필요한 재료 이름1", "amount": "재료 양" },
        { "name": "필요한 재료 이름2", "amount": "재료 양" }
      ]
    },
    {
      "description": "조리법 단계에 대한 설명을 요약하거나 누락하지 않고 레시피 원문 그대로 포함해서 자세히 적는다.",
      "images": ["이미지 url1", "이미지 url2", "이미지 url3"],
      "ingredients": [
        { "name": "필요한 재료 이름1", "amount": "재료 양" },
        { "name": "필요한 재료 이름2", "amount": "재료 양" }
      ]
    }
  ]
}
"""

아래는 만족해야할 요구사항이다.


요구사항:
"""
1. 레시피 제목("name")은 레시피 글에서 해당하는 제목을 축약하지 말고 레시피 원문 그대로 포함해야 한다.
2. 레시피에 대한 한줄 설명("description")은 레시피 글에서 해당하는 레시피에 대한 설명을 축약하지 말고 레시피 원문 그대로 포함해야 한다.
3. 레시피에서 필요한 재료 목록("ingredient_requirements")은 레시피 원문에서 일반 재료와 양념장 재료, 그 외 재료 등등 모두를 합하여 포함해야 한다.
4. 각 조리법 단계("recipe_steps")의 조리법 설명("description")은 원래의 레시피 글에서 해당하는 조리법 단계의 설명을 최대한 자세하게 포함해야 한다.
5. 위의 레시피에 대한 글에서 조리법 단계("recipe_steps")에 여러 이미지 url이 있는 경우 json 포맷으로 바꿀 때 여러 이미지 url을 모두 같은 조리법 단계의 이미지 목록("images")에 포함해야 한다.
6. 조리법 단계("recipe_steps")의 이미지 목록("images")은 반드시 레시피 원문에 있는 이미지 url을 그대로 포함해야 하며, 순서를 유지해야 한다.
7. 각 조리법 단계("recipe_steps")의 필요한 재료 목록("ingredients")는 반드시 레시피 원문에서의 각 단계에서 필요한 재료를 양념장과 일반 재료를 모두 포함해야 한다.
8. 각 조리법 단계("recipe_steps")의 필요한 재료 목록("ingredients")는 정확히 그 단계에서 필요한 재료만 포함하며, 절대 빈 배열이어서는 안된다.
"""

temperature: 0.0
`;

export const chatGPTQueryStringAdder = (recipeTextFromHtml: string) => `
아래 글은 레시피에 대한 글이다. 이 글을 보고 위의 요구사항을 모두 만족하면서, 예시로 적어둔 json 포맷으로 알려줘.

Text:
"""
${recipeTextFromHtml}
"""
`;

export const chatGPTQueryRawTextFormat = `레시피에 대한 내용만 추출해서 아래와 같은 json 형태의 code block으로 출력해줘.

JSON Format:
"""
{
  "recipe_raw_text": "레시피 제목\\n레시피에 대한 간단한 소개\\n레시피 대표 이미지 url\\n필요한 재료 목록\\n - 재료 이름1: 재료 양\\n- 재료 이름2: 재료 양\\n조리법 목록\\n  1. 조리법 설명1\\n  2. 조리법 설명2\\n  3. 조리법 설명3\\n"
}
"""

temperature: 0.0
`;

export const chatGPTQueryRawTextFormatForAPI = `레시피에 대한 내용만 추출해서 아래와 같은 json 형태로 출력해줘.

JSON Format:
"""
{
  "recipe_raw_text": "레시피 제목\\n레시피에 대한 간단한 소개\\n레시피 대표 이미지 url\\n필요한 재료 목록\\n - 재료 이름1: 재료 양\\n- 재료 이름2: 재료 양\\n조리법 목록\\n  1. 조리법 설명1\\n  2. 조리법 설명2\\n  3. 조리법 설명3\\n"
}
"""
`;
