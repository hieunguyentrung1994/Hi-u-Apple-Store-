package d9.traning_project.service.impl;

import d9.traning_project.exception.BadRequestException;
import d9.traning_project.exception.NotFoundException;
import d9.traning_project.model.domain.*;
import d9.traning_project.model.dto.request.OrderRequest;
import d9.traning_project.model.dto.response.CartResponse;
import d9.traning_project.model.dto.response.OrderResponse;
import d9.traning_project.repository.*;
import d9.traning_project.service.GenericService;
import d9.traning_project.service.mapper.OrderMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class OrderService extends GenericService<OrderRequest, OrderResponse, OrderRepository, OrderMapper> {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderMapper orderMapper;

    @Autowired
    private CartItemService cartService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private OrderDetailRepository orderDetailRepository;

    @Autowired
    private DiscountRepository discountRepository;

    @Autowired
    private PromotionEventRepository promotionEventRep;

    @Override
    public List<OrderResponse> findAll() {
        return orderRepository.findAll().stream()
                .map(c -> orderMapper.toResponse(c)).collect(Collectors.toList());
    }

    @Override
    public OrderResponse findById(Long id) {
        Optional<Order> orderOptional = orderRepository.findById(id);
        if (orderOptional.isPresent()) {
            return orderMapper.toResponse(orderOptional.get());
        }
        return null;
    }

    @Override
    public OrderResponse save(OrderRequest orderRequest) {
        Order ord = orderRepository.save(orderMapper.toEntity(orderRequest));
        return orderMapper.toResponse(ord);
    }

    @Override
    public OrderResponse update(OrderRequest orderRequest, Long id) {
        return null;
    }

    @Override
    public boolean delete(Long id) {
        return true;
    }

    public OrderResponse order(OrderRequest orderRequest) throws NotFoundException, BadRequestException {
        List<CartResponse> cartItemList = cartService.findAll();
        Users user = userRepository.findByEmail(orderRequest.getUserEmail()).get();
        if (cartItemList.isEmpty()) {
            throw new NotFoundException(CartItem.class);
        }
        // Create Order
        double amountAfterDiscount1 = orderRequest.getTotalAmount();
        double discountAmount = 0;
        double promotionPrice = 0;
        Set<Discount> discountList = new HashSet<>();
        for (Long id : orderRequest.getDiscountIds()
        ) {
            Optional<Discount> discount = discountRepository.findById(id);
            if (discount.isPresent()) {
                discountList.add(discount.get());
                discount.get().setStock(discount.get().getStock() - 1);
                if (discount.get().getStock() == 0) {
                    discount.get().setStatus(false);
                }
                discountRepository.save(discount.get());
                discountAmount = orderRequest.getTotalAmount() * discount.get().getDiscountPercent() / 100;

            }

        }
        Set<PromotionEvent> promotionEventList = new HashSet<>();
        for (Long id : orderRequest.getPromotionEventIds()
        ) {
            Optional<PromotionEvent> promotionEvent = promotionEventRep.findById(id);
            if (promotionEvent.isPresent()) {
                promotionEventList.add(promotionEvent.get());
                promotionPrice = promotionEvent.get().getDiscountPrice();
            }

        }
        amountAfterDiscount1 = orderRequest.getTotalAmount() - discountAmount - promotionPrice;
        if (amountAfterDiscount1 < 0) {
            amountAfterDiscount1 = 0;
        }

        double totalPrice = cartItemList.stream()
                .mapToDouble(CartResponse::getTotal)
                .sum();
        Order order = Order.builder()
                .orderDate(new Date())
                .totalAmount(totalPrice)
                .users(user)
                .address(orderRequest.getAddress())
                .note(orderRequest.getNote())
                .receiverName(orderRequest.getReceiverName())
                .phone(orderRequest.getPhone())
                .orderStatusNames(OrderStatus.PENDING)
                .promotionEvents(promotionEventList)
                .discounts(discountList)
                .amountAfterDiscount(amountAfterDiscount1)
                .build();
        Order newOrder = orderRepository.save(order);
        userRepository.save(user);
        for (CartResponse p : cartItemList) {
            Product product = productRepository.findById(p.getProductId()).get();
            if (product.getStock() < p.getQuantity()) {
                throw new BadRequestException(Product.class);
            }
            product.setStock(product.getStock() - p.getQuantity());
            if (product.getStock() == 0) {
                product.setProductStatus(false);
            }
            productRepository.save(product);
            OrderDetail orderDetails = OrderDetail.builder()
                    .order(newOrder)
                    .quantity(p.getQuantity())
                    .product(product)
                    .build();
            orderDetailRepository.save(orderDetails);
        }

        return orderMapper.toResponse(newOrder);
    }

    public OrderResponse changeStatus(Long idOrder, int statusCode) {
        Optional<Order> orderOptional = orderRepository.findById(idOrder);
        Order order = orderOptional.get();

        switch (statusCode) {
            case 1:
                order.setOrderStatusNames(OrderStatus.PENDING);
                orderRepository.save(order);
                break;
            case 2:
                order.setOrderStatusNames(OrderStatus.PROCESSING);
                orderRepository.save(order);
                break;
            case 3:
                order.setOrderStatusNames(OrderStatus.DELIVERED);
                orderRepository.save(order);
                break;
            case 4:
                order.setOrderStatusNames(OrderStatus.SHIPPING);
                orderRepository.save(order);
                break;
            case 5:
                order.setOrderStatusNames(OrderStatus.USER_CANCELLED);
                orderRepository.save(order);
                break;
            case 6:
                order.setOrderStatusNames(OrderStatus.SHOP_CANCELLED);
                orderRepository.save(order);
                break;
            default:
                throw new RuntimeException("Please choose from 1 to 6");
        }
        return orderMapper.toResponse(order);
    }

    public List<OrderResponse> getAll() {
        List<Order> orders = orderRepository.findAll();
        List<OrderResponse> orderResponses = new ArrayList<>();
        for (Order order : orders
        ) {
            orderResponses.add(orderMapper.toResponse(order));

        }
        return orderResponses;
    }

    public List<OrderResponse> getOrdersByDate(String date) throws ParseException {
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        Date date2 = dateFormat.parse(date);
        List<OrderResponse> list = findAll();
        List<OrderResponse> list0 = new ArrayList<>();
        for (OrderResponse orderResponseDto : list) {
            if (orderResponseDto.getOrderDate().equals(date2.getDate())) {
                list0.add(orderResponseDto);
            }
        }
        return list0;
    }

    public int countOrderByDate(String date) throws ParseException {
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        Date date2 = dateFormat.parse(date);
        return orderRepository.countOrderByDate(date2);
    }

    public double totalByDate(String date) throws ParseException {
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        Date date2 = dateFormat.parse(date);
        if (orderRepository.totalByDate(date2) == null) {
            return 0;
        }
        return orderRepository.totalByDate(date2);
    }

    public int countSuccessByDate(String date) throws ParseException {
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        Date date2 = dateFormat.parse(date);
        return orderRepository.countSuccessByDate(date2);
    }

    public int countCancelByDate(String date) throws ParseException {
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        Date date2 = dateFormat.parse(date);
        return orderRepository.countCancelByDate(date2);
    }

    public int countPendingByDate(String date) throws ParseException {
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        Date date2 = dateFormat.parse(date);
        return orderRepository.countPendingByDate(date2);
    }

    public int countOrderByMonth(int month, int year) {
        return orderRepository.countOrderByMonth(month, year);
    }

    public double totalByMonth(int month, int year) {
        if (orderRepository.totalByMonth(month, year) == null) {
            return 0;
        }
        return orderRepository.totalByMonth(month, year);
    }

    public List<OrderResponse> getHistory(String email) {
        List<Order> orders = orderRepository.getHistory(email);
        List<OrderResponse> orderResponses = new ArrayList<OrderResponse>();
        for (Order order : orders
        ) {
            orderResponses.add(orderMapper.toResponse(order));
        }
        return orderResponses;
    }
}