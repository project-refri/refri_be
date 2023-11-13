// script.js
import http from "k6/http";
import { sleep } from "k6";

export const options = {
  vus: 1000, // 가상 유저 수
  duration: "15s", // 테스트 시간
};

export default function () {
  const url = "http://test-api:8080/recipe/search?sort=created_at&page=1&limit=11";
  http.get(url);
  sleep(1);
}