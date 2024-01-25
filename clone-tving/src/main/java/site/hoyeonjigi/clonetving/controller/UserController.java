package site.hoyeonjigi.clonetving.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import site.hoyeonjigi.clonetving.dto.JsonWebTokenDto;
import site.hoyeonjigi.clonetving.dto.UserLoginRequsetDto;
import site.hoyeonjigi.clonetving.dto.UserRegisterRequestDto;
import site.hoyeonjigi.clonetving.service.UserService;
 
@RestController
@RequestMapping(value="/user")
public class UserController {
    @Autowired
    private UserService userService;

    @RequestMapping(value="/login", method=RequestMethod.POST)
	public ResponseEntity<JsonWebTokenDto> userLogin(@RequestBody UserLoginRequsetDto userLoginRequsetDto) throws Exception{
        String userId = userLoginRequsetDto.getUserId();
        String password = userLoginRequsetDto.getUserPassword();
        JsonWebTokenDto jsonWebTokenDto = userService.login(userId, password);
    
        return ResponseEntity.ok(jsonWebTokenDto);
	}

    @RequestMapping(value="/register", method=RequestMethod.POST)
	public ResponseEntity userRegister(@RequestBody UserRegisterRequestDto userRegisterRequestDto){

        try {
            userService.register(userRegisterRequestDto);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
		return ResponseEntity.status(HttpStatus.CREATED).build();
	}

}
