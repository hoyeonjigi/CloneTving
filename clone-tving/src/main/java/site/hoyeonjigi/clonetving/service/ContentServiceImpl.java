package site.hoyeonjigi.clonetving.service;

import java.util.List;
import java.util.stream.Collectors;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
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
    public List<ContentDto> selectContentByTitle(String contentTitle) {
        return null;
    }
    
}


