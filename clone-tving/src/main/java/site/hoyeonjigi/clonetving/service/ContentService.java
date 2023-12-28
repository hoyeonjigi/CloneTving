package site.hoyeonjigi.clonetving.service;

import java.util.List;

import site.hoyeonjigi.clonetving.dto.ContentDto;

public interface ContentService {
    List<ContentDto> selectReleasedContent(String classification) throws Exception;
    
}
