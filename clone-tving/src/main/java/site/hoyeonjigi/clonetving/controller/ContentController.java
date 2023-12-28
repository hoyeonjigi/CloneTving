package site.hoyeonjigi.clonetving.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import site.hoyeonjigi.clonetving.dto.ContentDto;
import site.hoyeonjigi.clonetving.service.ContentService;

@RestController
public class ContentController {
    
	@Autowired
    private ContentService contentService;

    @RequestMapping(value="/api/{classification}/release-date", method=RequestMethod.GET)
	public List<ContentDto> openReleasedContentList(@PathVariable("classification") String classification) throws Exception{
		return contentService.selectReleasedContent(classification);
	}
}
