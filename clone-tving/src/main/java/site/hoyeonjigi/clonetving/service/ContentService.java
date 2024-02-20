package site.hoyeonjigi.clonetving.service;

import java.io.UnsupportedEncodingException;
import java.util.List;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import site.hoyeonjigi.clonetving.dto.ContentDto;

public interface ContentService {
    List<ContentDto> selectReleasedContent(String classification) throws Exception;
    List<ContentDto> selectContentByGenre(String classification, String genre, int pageNumber) throws UnsupportedEncodingException;
    List<ContentDto> selectPopularContent(String classification, int pageNumber) throws UnsupportedEncodingException;
    List<ContentDto> selectContentByTitle(String contentTitle, int pageNumber) throws UnsupportedEncodingException;
    void updateView(String contentId, HttpServletRequest request, HttpServletResponse response);
}
