package site.hoyeonjigi.clonetving.service;

import java.io.UnsupportedEncodingException;
import java.util.List;

import site.hoyeonjigi.clonetving.dto.ContentDto;

public interface ContentService {
    List<ContentDto> selectReleasedContent(String classification) throws Exception;
    List<ContentDto> selectContentByGenre(String classification, String genre, int pageNumber) throws UnsupportedEncodingException;
}
