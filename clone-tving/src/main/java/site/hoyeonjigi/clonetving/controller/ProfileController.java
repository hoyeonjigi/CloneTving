package site.hoyeonjigi.clonetving.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import jakarta.validation.Valid;
import site.hoyeonjigi.clonetving.dto.ProfileDto;
import lombok.RequiredArgsConstructor;
import site.hoyeonjigi.clonetving.dto.RegistProfileDto;
import site.hoyeonjigi.clonetving.dto.UpdateProfileDto;
import site.hoyeonjigi.clonetving.service.ProfileService;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.io.UnsupportedEncodingException;
import java.util.List;


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

    @RequestMapping(value = "/api/searchprofiles/userid={userid}", method=RequestMethod.GET)
    public ResponseEntity<?> searchProfile(@PathVariable("userid")String userId){
        List<ProfileDto> profiles = profileService.selectProfile(userId);
        if(profiles == null || profiles.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("user not found");
        }
        return new ResponseEntity<>(profiles,HttpStatus.OK);
    }
    

    @RequestMapping(value = "/api/updateprofile", method=RequestMethod.PATCH)
    public ResponseEntity<String> updateProfile(@RequestBody @Valid UpdateProfileDto updateprofile){

        String response = profileService.updateProfile(updateprofile);
        if(response.contains("success")){
            return ResponseEntity.ok().body(response);
        }
        else{
            return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
        }
    }   

    @RequestMapping(value ="api/deleteprofile/profilename={profilename}/userid={userid}", method=RequestMethod.DELETE)
    public ResponseEntity<String> deleteProfile(@PathVariable("profilename")String ProfileName,
                                                            @PathVariable("userid")String userId) throws UnsupportedEncodingException{
        String response = profileService.deleteProfile(userId, ProfileName);
        if(response.contains("Not Found")){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
        else{
            return ResponseEntity.ok().body(response);
        }
    }
    
}