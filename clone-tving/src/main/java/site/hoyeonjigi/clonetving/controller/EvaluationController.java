package site.hoyeonjigi.clonetving.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import site.hoyeonjigi.clonetving.domain.EvaluationEntity;
import site.hoyeonjigi.clonetving.dto.EvaluationDto;
import site.hoyeonjigi.clonetving.service.EvaluationService;
import org.springframework.web.bind.annotation.GetMapping;
import java.util.List;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/evaluation")
@Slf4j
@RequiredArgsConstructor
public class EvaluationController {
    
    private final EvaluationService evaluationService;

    @PostMapping
    public ResponseEntity<EvaluationDto> evaluation(Authentication authentication, @RequestBody EvaluationDto evaluationDto) throws Exception{
        String authenticationUserId = getAuthenticationUserId(authentication);
        EvaluationDto savedEvaluation = evaluationService.registerEvaluation(authenticationUserId, evaluationDto);
        return ResponseEntity.ok().body(savedEvaluation);
    }

    @DeleteMapping("/{profileName}/{contentId}")
    public ResponseEntity<String> deleteEvaluation(Authentication authentication, @PathVariable("profileName") String profileName,
     @PathVariable("contentId")String contentId){
        String authenticationUserId = getAuthenticationUserId(authentication);
        evaluationService.deleteEvaluation(authenticationUserId, profileName, contentId);
        return ResponseEntity.ok().body("삭제완료");
    }

    @GetMapping("/{contentId}")
    public ResponseEntity<List<EvaluationDto>> evaluationList(@PathVariable("contentId")String contentId
    ,@RequestParam(value="page",defaultValue = "0")int offset){
        List<EvaluationDto> evaluationDtos = evaluationService.evaluationByContentId(contentId,offset);
        return ResponseEntity.ok().body(evaluationDtos);
    }
    public String getMethodName(@RequestParam String param) {
        return new String();
    }
    

    private String getAuthenticationUserId(Authentication authentication) {
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        String userId = userDetails.getUsername();
        return userId;
    }    
}
