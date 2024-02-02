package site.hoyeonjigi.clonetving.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import site.hoyeonjigi.clonetving.dto.RegistProfileDto;
import site.hoyeonjigi.clonetving.service.ProfileService;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;


@RestController
@RequiredArgsConstructor
public class ProfileController {
    
    private final ProfileService profileService;

    @RequestMapping(value ="/api/registprofile", method=RequestMethod.POST)
    public ResponseEntity<String> registerProfile(@RequestBody @Valid RegistProfileDto registprofile){
        
        String response = profileService.registProfile(registprofile);
        if(response.contains("\"success\":true")){
            return ResponseEntity.ok().body(response);
        }
        else{
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }   
    }    
    
}