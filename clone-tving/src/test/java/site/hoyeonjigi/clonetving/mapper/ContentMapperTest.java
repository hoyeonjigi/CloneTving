package site.hoyeonjigi.clonetving.mapper;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.io.UnsupportedEncodingException;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import site.hoyeonjigi.clonetving.dto.ContentDto;
import java.util.Map;
import java.util.HashMap;


@SpringBootTest
public class ContentMapperTest {
    @Autowired
    private ContentMapper contentMapper;

    @Test
    public void testGetContentByTitle() {
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
        String query = getWhereClauseConsonantsLast("아이ㅇ", "c.content_title", map);
        List<ContentDto> contentList = contentMapper.getContentByTitle("SUBSTR(c.content_title, 1, 2) = '아이' AND SUBSTR(c.content_title, 3, 1) >= '아' AND SUBSTR(c.content_title, 3, 1) < '자'",0);
        assertEquals("아이언맨 2", contentList.get(0).getContentTitle());
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
}