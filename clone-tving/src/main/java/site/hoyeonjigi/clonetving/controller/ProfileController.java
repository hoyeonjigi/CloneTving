package site.hoyeonjigi.clonetving.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RestController;
import jakarta.validation.Valid;
import site.hoyeonjigi.clonetving.dto.ProfileDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import site.hoyeonjigi.clonetving.dto.RegistProfileDto;
import site.hoyeonjigi.clonetving.dto.UpdateProfileDto;
import site.hoyeonjigi.clonetving.exception.LackofAuthorityException;
import site.hoyeonjigi.clonetving.service.ProfileService;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.io.UnsupportedEncodingException;
import java.util.List;


@RestController
@RequiredArgsConstructor
@RequestMapping("/profile")
public class ProfileController {
    
    private final ProfileService profileService;

    @RequestMapping(value ="/register", method=RequestMethod.POST)
    public ResponseEntity<ProfileDto> registerProfile(Authentication authentication, @RequestBody @Validated RegistProfileDto registprofile){
        String authenticationUserId = getAuthenticationUserId(authentication);
        ProfileDto profileDto = profileService.registProfile(authenticationUserId,registprofile);
        return ResponseEntity.ok().body(profileDto);
    }



    @RequestMapping(value = "/{userId}", method=RequestMethod.GET)
    public ResponseEntity<List<ProfileDto>> searchProfile(Authentication authentication,@PathVariable("userId")String userId){
        String authenticationUserId = getAuthenticationUserId(authentication);
        if(!authenticationUserId.equals(userId)){
            throw new LackofAuthorityException("해당 사용자 권한이 아닙니다");
        }
        List<ProfileDto> profiles = profileService.selectProfile(userId);
        return new ResponseEntity<>(profiles,HttpStatus.OK);
    }
    

    @RequestMapping(method=RequestMethod.PATCH)
    public ResponseEntity<String> updateProfile(@RequestBody @Valid UpdateProfileDto updateprofile){

        String response = profileService.updateProfile(updateprofile);
        if(response.contains("success")){
            return ResponseEntity.ok().body(response);
        }
        else{
            return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
        }
    }   

    @RequestMapping(value ="/{profileName}/{userId}", method=RequestMethod.DELETE)
    public ResponseEntity<String> deleteProfile(@PathVariable("profileName")String ProfileName,
                                                            @PathVariable("userId")String userId) throws UnsupportedEncodingException{
        String response = profileService.deleteProfile(userId, ProfileName);
        if(response.contains("Not Found")){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
        else{
            return ResponseEntity.ok().body(response);
        }
    }

    private String getAuthenticationUserId(Authentication authentication) {
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        String userId = userDetails.getUsername();
        return userId;
    }    
}