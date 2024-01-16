package site.hoyeonjigi.clonetving.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.HttpClientErrorException.BadRequest;
import jakarta.validation.Valid;
import jakarta.websocket.server.PathParam;
import site.hoyeonjigi.clonetving.domain.ProfileEntity;
import site.hoyeonjigi.clonetving.dto.ProfileDto;
import site.hoyeonjigi.clonetving.dto.RegistProfileDto;
import site.hoyeonjigi.clonetving.dto.UpdateProfileDto;
import site.hoyeonjigi.clonetving.service.ProfileService;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
public class ProfileController {
    
    @Autowired
    ProfileService profileService;

    @RequestMapping(value ="/api/profile/registprofile", method=RequestMethod.POST)
    public ResponseEntity<String> registerProfile(@RequestBody @Valid RegistProfileDto registprofile){
        
        String response = profileService.registProfile(registprofile);

        if(response.contains("not found")){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
        else if(response.contains("duplicate")){
            return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
        }

        return ResponseEntity.status(HttpStatus.CREATED).body(response);   
    }    

    @RequestMapping(value="/api/profile/searchProfiles/userId={userId}", method=RequestMethod.GET)
    public ResponseEntity<?> openProfileByUserId(@PathVariable("userId") String userId) {
        List<ProfileDto> profiles = profileService.selectProfileByUserId(userId);
        if(profiles == null){
            return new ResponseEntity<>("Not Found User",HttpStatus.NOT_FOUND);
        }
        if(profiles.isEmpty()){
            return new ResponseEntity<>("no profile data",HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(profiles, HttpStatus.OK);
    }

    @RequestMapping(value = "/api/profile/updateProfile", method=RequestMethod.PUT)
    public ResponseEntity<?> openProfileUpdate(@RequestBody UpdateProfileDto updateprofile){
        String response = profileService.updateProfile(updateprofile);

        if(response.contains("not found user")){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
        else if(response.contains("not found profile")){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
        else if(response.contains("duplicate")){
            return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
        }
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @RequestMapping(value = "/api/profile/delete/userId={userId}/profileName={profileName}", method=RequestMethod.DELETE)
    public ResponseEntity<?> openProfileDelete(@PathVariable("userId")String userId, @PathVariable("profileName")String profileName) {
        String response = profileService.deleteProfile(userId, profileName);
        if(response.contains("not found user")){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
        else if(response.contains("not found profile")){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
    
    

}