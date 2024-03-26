package site.hoyeonjigi.clonetving.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RegistProfileDto {
    
    @NotEmpty
    private String profileName;

    @NotEmpty
    private String imageName;

    @NotNull
    private Boolean child;
    
}
