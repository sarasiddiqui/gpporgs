package edu.berkeley.gpporgs.resolver;

import com.coxautodev.graphql.tools.GraphQLQueryResolver;
import edu.berkeley.gpporgs.model.*;
import edu.berkeley.gpporgs.repository.*;
import edu.berkeley.gpporgs.security.CurrentUser;
import edu.berkeley.gpporgs.security.UserPrincipal;
import graphql.GraphQLException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public class QueryResolver implements GraphQLQueryResolver {

    @Autowired
    private AffiliationRepository affiliationRepository;

    @Autowired
    private CountryRepository countryRepository;

    @Autowired
    private LanguageRepository languageRepository;

    @Autowired
    private OrganizationRepository organizationRepository;

    @Autowired
    private RegionRepository regionRepository;

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private SectorRepository sectorRepository;

    @Autowired
    private TypeRepository typeRepository;

    @Autowired
    private UserRepository userRepository;

    @Value("${mysql_data_delimiter}")
    private String dataDelimiter;

    public Iterable<Affiliation> affiliations() {
        return affiliationRepository.findAll();
    }

    public Iterable<Country> countries() {
        return countryRepository.findAll();
    }

    public User currentUser(@CurrentUser UserPrincipal userPrincipal) {
        return userRepository.findById(userPrincipal.getUserId())
                .orElse(null);
    }

    public Iterable<Language> languages() {
        return languageRepository.findAll();
    }

    public Organization organization(Long organizationId) throws GraphQLException {
        return organizationRepository.findById(organizationId).orElse(null);
    }

    public Iterable<Organization> organizations(String area, List<Long> sectorIds, Integer offset, Integer limit) {
        return organizationRepository.findAll();
    }

    public Iterable<Region> regions() {
        return regionRepository.findAll();
    }

    public Iterable<Review> reviews(Long organizationId) {
        return reviewRepository.findAllByOrganizationId(organizationId);
    }

    public Iterable<Sector> sectors() {
        return sectorRepository.findAll();
    }

    public Iterable<Type> types() {
        return typeRepository.findAll();
    }

    public User user(String username) {
        return userRepository.findByUsername(username).orElse(null);
    }
}
