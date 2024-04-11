package site.hoyeonjigi.clonetving.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import lombok.RequiredArgsConstructor;
import site.hoyeonjigi.clonetving.common.ExceptionHandlerFilter;
import site.hoyeonjigi.clonetving.common.JwtAuthenticationFilter;
import site.hoyeonjigi.clonetving.common.JwtProvider;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class WebSecurityConfig implements WebMvcConfigurer{

    private final JwtProvider jwtProvider;

    @Bean
    public BCryptPasswordEncoder encoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf(AbstractHttpConfigurer::disable)
            .sessionManagement((sessionManagement) -> sessionManagement.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .formLogin((formLogin) -> formLogin.disable())
            .httpBasic((httpBasic) -> httpBasic.disable())
            .authorizeHttpRequests((authorizeHttpRequests) -> authorizeHttpRequests 
                                        .requestMatchers("/v3/api-docs/**", "/swagger-ui/**").permitAll()
                                        .requestMatchers(HttpMethod.GET, "/health-check", "/user/exist/{userId}").permitAll()
                                        .requestMatchers(HttpMethod.POST, "/user/login", "/user/refresh", "/user/register").permitAll()
                                        .anyRequest().authenticated())
            .addFilterBefore(new JwtAuthenticationFilter(jwtProvider), UsernamePasswordAuthenticationFilter.class)
            .addFilterBefore(new ExceptionHandlerFilter(), JwtAuthenticationFilter.class);
            return http.build();    
            
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:3000","https://clone-tving.vercel.app")
                .allowedMethods("*")                
                .allowedHeaders("*")
                .allowCredentials(true)
                .maxAge(3600);
        
    }

    
    
}
