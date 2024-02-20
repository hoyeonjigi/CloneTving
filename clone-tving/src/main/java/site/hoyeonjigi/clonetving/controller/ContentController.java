package site.hoyeonjigi.clonetving.controller;

import java.io.UnsupportedEncodingException;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
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
@RequestMapping(value = "/contents")
public class ContentController {
    
    private final ContentService contentService;

    @RequestMapping(value="/{classification}/lastest20", method=RequestMethod.GET)
	public List<ContentDto> openReleasedContentList(@PathVariable("classification") String classification) throws Exception{
		return contentService.selectReleasedContent(classification);
	}

	@RequestMapping(value="/{classification}/{genre}", method=RequestMethod.GET)
	public List<ContentDto> openContentByGenre(@PathVariable("classification")String classification,
	 	@PathVariable("genre")String genre, @RequestParam(value="page",defaultValue = "0")int pageNumber) throws Exception {
		return contentService.selectContentByGenre(classification, genre, pageNumber);
	}
	
	@RequestMapping(value="/{classification}/popular", method=RequestMethod.GET)
	public List<ContentDto> openPopularContent(@PathVariable("classification")String classification,
												@RequestParam(value="page",defaultValue = "0")int pageNumber) throws Exception{
		return contentService.selectPopularContent(classification,pageNumber);
	}	

	@RequestMapping(value="/{contenttitle}", method=RequestMethod.GET)
	public List<ContentDto> openContentByTitle(@PathVariable("contenttitle")String contentTitle,
												@RequestParam(value="page",defaultValue = "0")int pageNumber) throws UnsupportedEncodingException{
		return contentService.selectContentByTitle(contentTitle,pageNumber);
	}

	@RequestMapping(value="/content/view/click", method=RequestMethod.PATCH)
	public ResponseEntity<?> userDelete(@PathVariable("classification") String classification) throws Exception{
        
        
		return ResponseEntity.ok().build();
	}
	
}
