package site.hoyeonjigi.clonetving.domain;

import java.util.ArrayList;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;

@Entity
@Table(name = "profile")
@Data
@AllArgsConstructor
@IdClass(ProfileEntityPK.class)
public class ProfileEntity {
    
    @Id
    private String profileName;

    @Id
    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserEntity user;

    @Column(nullable=false)
    private byte[] profileImage;

    @Column(nullable=false)
    private boolean child;

    @OneToMany(mappedBy = "profileentity", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private ArrayList<RecentViewEntity> recentviews = new ArrayList<>();

}
