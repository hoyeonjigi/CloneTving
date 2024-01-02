package site.hoyeonjigi.clonetving.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import site.hoyeonjigi.clonetving.dto.ContentDto;
import site.hoyeonjigi.clonetving.service.ContentService;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
public class ContentController {
    
	@Autowired
    private ContentService contentService;

    @RequestMapping(value="/api/classification={classification}/release-date", method=RequestMethod.GET)
	public List<ContentDto> openReleasedContentList(@PathVariable("classification") String classification) throws Exception{
		return contentService.selectReleasedContent(classification);
	}

	@RequestMapping(value="/api/contentbygenre/classification={classification}/genre={genre}", method=RequestMethod.GET)
	public List<ContentDto> openContentByGenre(@PathVariable("classification")String classification,
	 	@PathVariable("genre")String genre, @RequestParam(value="page",defaultValue = "0")int pageNumber) throws Exception {
		return contentService.selectContentByGenre(classification, genre, pageNumber);
	}
	
}
