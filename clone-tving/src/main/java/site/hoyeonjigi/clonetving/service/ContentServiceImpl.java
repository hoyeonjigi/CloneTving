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
import site.hoyeonjigi.clonetving.repository.ContentRepository;
import site.hoyeonjigi.clonetving.repository.GenreRepository;

@Service
@RequiredArgsConstructor
public class ContentServiceImpl implements ContentService{

    private final ContentRepository contentRepository;
    private final GenreRepository genreRepository;
    private static final Map<String, String[]> map = new HashMap<>();
    static {
        map.put("ㄱ", new String[]{"가", "까"});
        map.put("ㄲ", new String[]{"까", "나"});
        map.put("ㄴ", new String[]{"나", "다"});
        map.put("ㄷ", new String[]{"다", "따"});
        map.put("ㄸ", new String[]{"따", "라"});
        map.put("ㄹ", new String[]{"라", "마"});
        map.put("ㅁ", new String[]{"마", "바"});
        map.put("ㅂ", new String[]{"바", "빠"});
        map.put("ㅃ", new String[]{"빠", "사"});
        map.put("ㅅ", new String[]{"사", "싸"});
        map.put("ㅆ", new String[]{"싸", "아"});
        map.put("ㅇ", new String[]{"아", "자"});
        map.put("ㅈ", new String[]{"자", "짜"});
        map.put("ㅉ", new String[]{"짜", "차"});
        map.put("ㅊ", new String[]{"차", "카"});
        map.put("ㅋ", new String[]{"카", "타"});
        map.put("ㅌ", new String[]{"타", "파"});
        map.put("ㅍ", new String[]{"파", "하"});
        map.put("ㅎ", new String[]{"하", "힣"});
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
    public List<ContentDto> selectContentByTitle(String contentTitle) throws UnsupportedEncodingException{
        String decodeContentTitle = URLDecoder.decode(contentTitle, "UTF-8");
        List<ContentEntity> contentEntities = null;
        List<ContentDto> contentDtos = null;
        return null;
    }

    public boolean isConsonants(String query) {
        return query.chars().allMatch(c -> map.containsKey(String.valueOf((char) c)));
    }
    
}


