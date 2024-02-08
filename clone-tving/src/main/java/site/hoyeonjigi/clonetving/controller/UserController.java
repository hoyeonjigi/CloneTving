package site.hoyeonjigi.clonetving.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import site.hoyeonjigi.clonetving.dto.JsonWebTokenDto;
import site.hoyeonjigi.clonetving.dto.UserLoginRequsetDto;
import site.hoyeonjigi.clonetving.dto.UserRegisterRequestDto;
import site.hoyeonjigi.clonetving.service.UserService;
 
@RestController
@RequestMapping(value="/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @RequestMapping(value="/login", method=RequestMethod.POST)
	public ResponseEntity<JsonWebTokenDto> userLogin(@RequestBody UserLoginRequsetDto userLoginRequsetDto) throws Exception{
        String userId = userLoginRequsetDto.getUserId();
        String password = userLoginRequsetDto.getUserPassword();
        JsonWebTokenDto jsonWebTokenDto = userService.login(userId, password);
    
        return ResponseEntity.ok(jsonWebTokenDto);
	}

    //엑세스토큰의 유효기간이 지났다면, 리프레시 토큰을 받는다.
    @RequestMapping(value="/refresh", method=RequestMethod.POST)
	public ResponseEntity<JsonWebTokenDto> userRefresh(HttpServletRequest request) throws Exception{
        
        JsonWebTokenDto jsonWebTokenDto = userService.tokenRefresh(request);
    
        return ResponseEntity.ok(jsonWebTokenDto);
	}
  
    
    @RequestMapping(value="/register", method=RequestMethod.POST)
	public ResponseEntity<?> userRegister(@RequestBody UserRegisterRequestDto userRegisterRequestDto) throws Exception{

        userService.register(userRegisterRequestDto);
        
		return ResponseEntity.status(HttpStatus.CREATED).build();
	}

    @RequestMapping(value="/edit", method=RequestMethod.POST)
	public ResponseEntity<?> userEditInfo(@RequestBody UserRegisterRequestDto userRegisterRequestDto) throws Exception{

        userService.register(userRegisterRequestDto);
        
		return ResponseEntity.status(HttpStatus.CREATED).build();
	}

    @RequestMapping(value="/{userId}",method=RequestMethod.DELETE)
	public ResponseEntity<?> userDelete(@PathVariable String userId) throws Exception{

        userService.delete(userId);
        
		return ResponseEntity.ok().build();
	}

}
