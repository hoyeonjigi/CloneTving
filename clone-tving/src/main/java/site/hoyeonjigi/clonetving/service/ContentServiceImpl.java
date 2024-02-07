package site.hoyeonjigi.clonetving.service;

import java.util.List;
import java.util.stream.Collectors;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;

import java.util.Map;
import java.util.HashMap;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import site.hoyeonjigi.clonetving.domain.ContentEntity;
import site.hoyeonjigi.clonetving.dto.ContentDto;
import site.hoyeonjigi.clonetving.dto.MyBatisContentDto;
import site.hoyeonjigi.clonetving.mapper.ContentMapper;
import site.hoyeonjigi.clonetving.repository.ContentRepository;
import site.hoyeonjigi.clonetving.repository.GenreRepository;

@Service
@RequiredArgsConstructor
public class ContentServiceImpl implements ContentService{

    private final ContentRepository contentRepository;
    private final GenreRepository genreRepository;
    private final ContentMapper contentMapper;
    private static final Map<Character, String[]> map = new HashMap<>();
    static {
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

    private static String getWhereClause(String query, String column) {
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

    private static String getWhereClauseConsonantsLast(String query, String column){
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

    private static boolean isConsonants(String query) {
        for (char c : query.toCharArray()) {
            if (!map.containsKey(c)) {
                return false;
            }
        }
        return true;
    }
    private static boolean isLastConsonants(String query) {
        char lastChar = query.charAt(query.length() - 1);
        return map.containsKey(lastChar);
    }

    @Override
    public List<ContentDto> selectReleasedContent(String classification) throws Exception {
        List<ContentEntity> contentEntities = null; 
        List<ContentDto> contentDtos = null; 
        String decodeClassification = URLDecoder.decode(classification, "UTF-8");
        contentEntities = contentRepository.findFirst20ByContentClassificationOrderByContentReleaseDateDesc(decodeClassification);
        contentDtos = contentEntities.stream().map(o -> new ContentDto(o)).collect(Collectors.toList());
        
        return contentDtos;
    }

    @Override
    public List<ContentDto> selectContentByGenre(String classification, String genre, int pageNumber) throws UnsupportedEncodingException {
        String decodeGenreName = URLDecoder.decode(genre, "UTF-8");
        String decodeClassification = URLDecoder.decode(classification, "UTF-8");
        List<ContentEntity> contentEntities = null; 
        List<ContentDto> contentDtos = null;
        int pageSize = 20;
        Pageable pageable = PageRequest.of(pageNumber, pageSize);
        
        contentEntities = contentRepository.findContentByGenre(decodeClassification, decodeGenreName, pageable);
        contentDtos = contentEntities.stream().map(o->new ContentDto(o)).collect(Collectors.toList());
        
        return contentDtos;
    }

    @Override
    public List<ContentDto> selectPopularContent(String classification, int pageNumber) throws UnsupportedEncodingException {
        String decodeClassification = URLDecoder.decode(classification, "UTF-8");
        List<ContentEntity> contentEntities = null;
        List<ContentDto> contentDtos = null;
        int pageSize = 20;
        Pageable pageable = PageRequest.of(pageNumber, pageSize);

        contentEntities = contentRepository.findPopularContent(decodeClassification, pageable);
        contentDtos = contentEntities.stream().map(o->new ContentDto(o)).collect(Collectors.toList());
        return contentDtos;
    }

    @Override
    public List<?> selectContentByTitle(String contentTitle, int pageNumber) throws UnsupportedEncodingException{
        String decodeContentTitle = URLDecoder.decode(contentTitle, "UTF-8");
        List<ContentEntity> contentEntities = null;
        List<ContentDto> contentDtos = null;
        int pageSize = 20;
        Pageable pageable = PageRequest.of(pageNumber, pageSize);
        if(isConsonants(decodeContentTitle)){
            String whereQuery = getWhereClause(decodeContentTitle, "c.content_title");
            List<MyBatisContentDto> myBatisContentDtos = contentMapper.getContentByTitle(whereQuery);
            return myBatisContentDtos;
        }
        if(isLastConsonants(decodeContentTitle)){
            String whereQuery = getWhereClauseConsonantsLast(decodeContentTitle, "c.content_title");
            List<MyBatisContentDto> myBatisContentDtos = contentMapper.getContentByTitle(whereQuery);
            return myBatisContentDtos;
        }
        contentEntities = contentRepository.findByContentTitleContaining(decodeContentTitle , pageable);
        contentDtos = contentEntities.stream().map(o->new ContentDto(o)).collect(Collectors.toList());
        return contentDtos;

    }
    
}


