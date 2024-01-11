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

    @RequestMapping(value ="/api/registprofile", method=RequestMethod.POST)
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

    @RequestMapping(value="/api/searchProfiles/userId={userId}", method=RequestMethod.GET)
    public ResponseEntity<?> openProfileByUserId(@PathVariable("userId") String userId) {
        List<ProfileDto> profiles = profileService.selectProfileByUserId(userId);
        if(profiles == null || profiles.isEmpty()){
            return new ResponseEntity<>("Not Found User",HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(profiles, HttpStatus.OK);
    }

}