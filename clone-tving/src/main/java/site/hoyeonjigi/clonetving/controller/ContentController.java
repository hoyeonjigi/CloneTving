package site.hoyeonjigi.clonetving.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import site.hoyeonjigi.clonetving.dto.ContentDto;
import site.hoyeonjigi.clonetving.service.ContentService;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequiredArgsConstructor
public class ContentController {
    
    private final ContentService contentService;

    @RequestMapping(value="/api/release-date/classification={classification}", method=RequestMethod.GET)
	public List<ContentDto> openReleasedContentList(@PathVariable("classification") String classification) throws Exception{
		return contentService.selectReleasedContent(classification);
	}

	@RequestMapping(value="/api/contentbygenre/classification={classification}/genre={genre}", method=RequestMethod.GET)
	public List<ContentDto> openContentByGenre(@PathVariable("classification")String classification,
	 	@PathVariable("genre")String genre, @RequestParam(value="page",defaultValue = "0")int pageNumber) throws Exception {
		return contentService.selectContentByGenre(classification, genre, pageNumber);
	}
	
	@RequestMapping(value="/api/popular/classification={classification}", method=RequestMethod.GET)
	public List<ContentDto> openPopularContent(@PathVariable("classification")String classification,
												@RequestParam(value="page",defaultValue = "0")int pageNumber) throws Exception{
		return contentService.selectPopularContent(classification,pageNumber);
	}	

	@RequestMapping(value="/api/content/title={contenttitle}", method=RequestMethod.GET)
	public ResponseEntity<?> openContentByTitle(@PathVariable("contenttitle")String contentTitle){
		return null;
	}
	
}
