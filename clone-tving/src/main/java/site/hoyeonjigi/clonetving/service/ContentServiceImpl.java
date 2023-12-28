package site.hoyeonjigi.clonetving.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import site.hoyeonjigi.clonetving.domain.ContentEntity;
import site.hoyeonjigi.clonetving.dto.ContentDto;
import site.hoyeonjigi.clonetving.repository.ContentRepository;

@Service
public class ContentServiceImpl implements ContentService{

    @Autowired
    ContentRepository contentRepository;

    @Override
    public List<ContentDto> selectReleasedContent(String classification) throws Exception {
        List<ContentEntity> contentEntities = null; 
        List<ContentDto> contentDtos = null; 
        if(classification.equals("movie")){
            contentEntities = contentRepository.findFirst20ByContentClassificationOrderByContentReleaseDateDesc("영화");
            contentDtos = contentEntities.stream().map(o -> new ContentDto(o)).collect(Collectors.toList());
        } else if(classification.equals("drama")) {
            contentEntities = contentRepository.findFirst20ByContentClassificationOrderByContentReleaseDateDesc("드라마");
            contentDtos = contentEntities.stream().map(o -> new ContentDto(o)).collect(Collectors.toList());
        }
        
        return contentDtos;
    }
    
}
