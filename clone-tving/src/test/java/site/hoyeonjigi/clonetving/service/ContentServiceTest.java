package site.hoyeonjigi.clonetving.service;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertEquals;

import java.io.UnsupportedEncodingException;
import java.util.HashMap;
import java.util.Map;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowire;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import site.hoyeonjigi.clonetving.dto.MyBatisContentDto;

@SpringBootTest
public class ContentServiceTest {
    @Autowired
    ContentServiceImpl contentServiceImpl;


    @Test
    @DisplayName("검색 Service 테스트")
    void selectContentByTitle() throws UnsupportedEncodingException{
        List<MyBatisContentDto> testDto = (List<MyBatisContentDto>) contentServiceImpl.selectContentByTitle("%ec%95%84%ec%9d%b4%e3%85%87",
                                                                                     0);
        assertEquals(testDto.get(0).getContentTitle(), "아이언맨 2");
    }

    @Test
    @DisplayName("초성으로 이루어진 문자열인지 확인하는 메소드")
    void isConsonantsTest(){
        Map<Character, String[]> map = new HashMap<>();
        {
            map.put('ㄱ', new String[]{"가", "까"});
            map.put('ㄲ', new String[]{"까", "나"});
            map.put('ㄴ', new String[]{"나", "다"});
            map.put('ㄷ', new String[]{"다", "따"});
            map.put('ㄸ', new String[]{"따", "라"});
            map.put('ㄹ', new String[]{"라", "마"});
            map.put('ㅁ', new String[]{"마", "바"});
            map.put('ㅂ', new String[]{"바", "빠"});
            map.put('ㅃ', new String[]{"빠", "사"});
            map.put('ㅅ', new String[]{"사", "싸"});
            map.put('ㅆ', new String[]{"싸", "아"});
            map.put('ㅇ', new String[]{"아", "자"});
            map.put('ㅈ', new String[]{"자", "짜"});
            map.put('ㅉ', new String[]{"짜", "차"});
            map.put('ㅊ', new String[]{"차", "카"});
            map.put('ㅋ', new String[]{"카", "타"});
            map.put('ㅌ', new String[]{"타", "파"});
            map.put('ㅍ', new String[]{"파", "하"});
            map.put('ㅎ', new String[]{"하", "힣"});
        }
        String input = "ㄱㅁㅇ";
        boolean testConsonalts = isConsonants(input,map);
        assertEquals(testConsonalts, true);
    }

    @Test
    @DisplayName("초성으로 이루어진 검색어 쿼리 생성 메서드")
    void getWhereClauseTest(){

        Map<Character, String[]> map = new HashMap<>();
    {
        map.put('ㄱ', new String[]{"가", "까"});
        map.put('ㄲ', new String[]{"까", "나"});
        map.put('ㄴ', new String[]{"나", "다"});
        map.put('ㄷ', new String[]{"다", "따"});
        map.put('ㄸ', new String[]{"따", "라"});
        map.put('ㄹ', new String[]{"라", "마"});
        map.put('ㅁ', new String[]{"마", "바"});
        map.put('ㅂ', new String[]{"바", "빠"});
        map.put('ㅃ', new String[]{"빠", "사"});
        map.put('ㅅ', new String[]{"사", "싸"});
        map.put('ㅆ', new String[]{"싸", "아"});
        map.put('ㅇ', new String[]{"아", "자"});
        map.put('ㅈ', new String[]{"자", "짜"});
        map.put('ㅉ', new String[]{"짜", "차"});
        map.put('ㅊ', new String[]{"차", "카"});
        map.put('ㅋ', new String[]{"카", "타"});
        map.put('ㅌ', new String[]{"타", "파"});
        map.put('ㅍ', new String[]{"파", "하"});
        map.put('ㅎ', new String[]{"하", "힣"});
    }
        
        String query = getWhereClause("ㄱㅁㅅ", "yourColumnName", map);
        assertEquals(query, "SUBSTR(yourColumnName, 1, 1) >= '가' AND SUBSTR(yourColumnName, 1, 1) < '까' "+
        "AND SUBSTR(yourColumnName, 2, 1) >= '마' AND SUBSTR(yourColumnName, 2, 1) < '바' "+
        "AND SUBSTR(yourColumnName, 3, 1) >= '사' AND SUBSTR(yourColumnName, 3, 1) < '싸'");
    }


    @Test
    @DisplayName("마지막이 초성으로 이루어진 검색어 쿼리 생성 메서드")
    void getWhereClauseLastConsonantsTest(){

        Map<Character, String[]> map = new HashMap<>();
    {
        map.put('ㄱ', new String[]{"가", "까"});
        map.put('ㄲ', new String[]{"까", "나"});
        map.put('ㄴ', new String[]{"나", "다"});
        map.put('ㄷ', new String[]{"다", "따"});
        map.put('ㄸ', new String[]{"따", "라"});
        map.put('ㄹ', new String[]{"라", "마"});
        map.put('ㅁ', new String[]{"마", "바"});
        map.put('ㅂ', new String[]{"바", "빠"});
        map.put('ㅃ', new String[]{"빠", "사"});
        map.put('ㅅ', new String[]{"사", "싸"});
        map.put('ㅆ', new String[]{"싸", "아"});
        map.put('ㅇ', new String[]{"아", "자"});
        map.put('ㅈ', new String[]{"자", "짜"});
        map.put('ㅉ', new String[]{"짜", "차"});
        map.put('ㅊ', new String[]{"차", "카"});
        map.put('ㅋ', new String[]{"카", "타"});
        map.put('ㅌ', new String[]{"타", "파"});
        map.put('ㅍ', new String[]{"파", "하"});
        map.put('ㅎ', new String[]{"하", "힣"});
    }
        
        String query = getWhereClauseConsonantsLast("아이언ㅁ", "yourColumnName", map);
        assertEquals(query, "SUBSTR(yourColumnName, 1, 3) = '아이언' AND SUBSTR(yourColumnName, 4, 1) >= '마' AND SUBSTR(yourColumnName, 4, 1) < '바' ");
    }


    public String getWhereClause(String query, String column,Map<Character, String[]> map) {
        StringBuilder clause = new StringBuilder();
        
        for (int i = 0; i < query.length(); i++) {
            char c = query.charAt(i);
            String[] range = map.get(c);
            
            if (range != null) {
                clause.append(String.format("SUBSTR(%s, %d, 1) >= '%s' AND SUBSTR(%s, %d, 1) < '%s' AND ",
                        column, i + 1, range[0], column, i + 1, range[1]));
            }
        }

        // 마지막에 추가된 "AND"를 제거
        if (clause.length() > 0) {
            clause.setLength(clause.length() - 5);
        }

        return clause.toString();
    }

    public String getWhereClauseConsonantsLast(String query, String column,Map<Character, String[]> map ){
        StringBuilder clause = new StringBuilder();
        char lastChar = query.charAt(query.length() - 1);
        String[] range = map.get(lastChar);
        String substring = query.substring(0, query.length() - 1);
        if (range != null) {
            clause.append(String.format("SUBSTR(%s, 1, %d) = '%s' ", column, query.length() - 1, substring));
            clause.append(String.format("AND SUBSTR(%s, %d, 1) >= '%s' AND SUBSTR(%s, %d, 1) < '%s' ",
                    column, query.length(), range[0], column, query.length(), range[1]));
        }
        return clause.toString();
    }

    private boolean isConsonants(String query, Map<Character, String[]> map) {
        for (char c : query.toCharArray()) {
            if (!map.containsKey(c)) {
                return false;
            }
        }
        return true;
    }
}
