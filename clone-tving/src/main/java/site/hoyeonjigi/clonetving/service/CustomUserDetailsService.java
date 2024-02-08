package site.hoyeonjigi.clonetving.service;

import java.util.Optional;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import site.hoyeonjigi.clonetving.domain.UserEntity;
import site.hoyeonjigi.clonetving.repository.UserRepository;

@RequiredArgsConstructor
@Service
public class CustomUserDetailsService implements UserDetailsService{

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<UserEntity> optional = userRepository.findByUserId(username);
        if (!optional.isPresent()) {
            throw new UsernameNotFoundException("해당 아이디가 존재하지 않습니다.");
        } 
        
        return User.builder()
                .username(optional.get().getUserId())
                .password(optional.get().getUserPassword())
                .roles("USER")
                .build();
    }
    
}
