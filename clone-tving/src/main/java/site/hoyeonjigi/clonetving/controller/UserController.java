package site.hoyeonjigi.clonetving.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

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

    // //엑세스토큰의 유효기간이 지났다면, 리프레시 토큰을 받는다.
    // @RequestMapping(value="/auto-login", method=RequestMethod.POST)
	// public ResponseEntity<JsonWebTokenDto> userAutoLogin(@RequestBody UserLoginRequsetDto userLoginRequsetDto) throws Exception{
        
    //     //유저테이블에서 해당 유저의 리프레시토큰 정보를 가져온다
    //     //비교 후 맞다면 엑세스토큰, 리프레시토큰 반환
    //     //비교 후 아니라면 해킹의 우려가 있으므로, 유저테이블의 리프레시토큰 정보를 null로 업데이트 후 다시 로그인하라고 클라이언트에 메세지를 보낸다.
	// }

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
